import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/registerLogin.css'
import axios from 'axios'

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        avatar: '',
        password: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const username = form.username.trim();
        const email = form.email.trim();
        const password = form.password.trim();
        let avatar = form.avatar.trim();

        // Validate required fields
        if (!username || !email || !password) {
            alert("Please fill in all required fields without empty spaces.");
            return;
        }

        // Auto-generate avatar if blank
        if (!avatar) {
            const initial = username.charAt(0).toUpperCase();
            avatar = `https://placehold.co/40x40.png?text=${initial}`;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:5100/api/register",
                { username, email, avatar, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("✅ User registered successfully, please login.");
            navigate("/login");

        } catch (err) {
            console.error("❌ Registration failed:", err.response?.data?.message || err.message);
            alert("Registration failed: " + (err.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Create your account</h2>

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder='username'
                    value={form.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />

                <label htmlFor="avatar">Avatar URL (optional)</label>
                <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    placeholder='avatar url'
                    value={form.avatar}
                    onChange={handleChange}
                    autoComplete="photo"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder='password'
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                />

                <button className="auth-btn" type="submit">Register</button>

                <div className="auth-switch">
                    Already have an account?{' '}
                    <span className="auth-link" onClick={() => navigate('/login')}>Sign in</span>
                </div>
            </form>
        </div>
    )
}

export default Register
