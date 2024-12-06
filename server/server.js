import express from 'express'
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import connect from './db/config.js'
import User from './user.model.js'
import morgan from 'morgan'



const app = express();
const port = 5000;

app.use(cors({
    origin: " http://localhost:5173",
    credentials:true
}));
app.use(morgan())
app.use(bodyParser.json()); // to parse incoming request bodies

// JWT Secret Key
const JWT_SECRET = "my secret";

// Registration Route
app.post('/api/register', async (req, res) => {
  const { name, dob, email, password } = req.body;

  if (!name || !dob || !email || !password) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      dob,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Return success response with token and user data
    res.status(201).send({
      message: 'User registered successfully!',
      token,
      user: { name: newUser.name, email: newUser.email, dob: newUser.dob }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Return success response with token and user data
    res.status(200).send({
      message: 'Login successful!',
      token,
      user: { name: user.name, email: user.email, dob: user.dob }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

// Start server
app.listen(port, async() => {
    await connect()
  console.log(`Server running on http://localhost:${port}`);
});
