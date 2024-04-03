// SignupPage.js
import React, { useState } from 'react';
import {customerCreate} from "@/actions/Auth";

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await customerCreate(email, password, firstName, lastName);
            if (response.customerUserErrors.length === 0) {
                // Handle successful signup, e.g., redirect or show message
            } else {
                console.error('Errors:', response.customerUserErrors);
                // Handle errors
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="signup-form">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
