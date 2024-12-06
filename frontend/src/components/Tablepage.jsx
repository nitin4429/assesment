import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/'); // Redirect to login if no token or user data
    } else {
      setUser(JSON.parse(storedUser)); // Set user data from localStorage
    }
  }, [navigate]);

  if (!user) return null; // If the user data isn't available yet, return nothing

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">User Information Table</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Field</th>
              <th className="px-4 py-2 border border-gray-300">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Name</td>
              <td className="px-4 py-2 border border-gray-300">{user.name}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Email</td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">DOB</td>
              <td className="px-4 py-2 border border-gray-300">{user.dob}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
