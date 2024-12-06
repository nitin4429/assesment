import mongoose from 'mongoose'

const Connect = async()=>{
    try {
       await mongoose.connect('mongodb://localhost:27017/assesment') 
       console.log("connected with mongodb");
       
    } catch (error) {
        console.log(error);
    }
}
export default Connect;