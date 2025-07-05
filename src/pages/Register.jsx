import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/registerLogin.css'

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

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: handle registration logic
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
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />
                <label htmlFor="avatar">Avatar URL</label>
                <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    value={form.avatar}
                    onChange={handleChange}
                    autoComplete="photo"
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
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