import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/register',
                { username, email, password });

           
                alert('Registration successful!');
                onRegister(response.data); // Pass the registered user data to the parent component
            
        }
        catch (error) {
            alert('Error' + (error.response?.data || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;