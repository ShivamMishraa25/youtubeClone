import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/registerLogin.css'

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: handle login logic
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Sign in</h2>
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
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />
                <button className="auth-btn" type="submit">Login</button>
                <div className="auth-switch">
                    Don't have an account?{' '}
                    <span className="auth-link" onClick={() => navigate('/register')}>Sign up</span>
                </div>
            </form>
        </div>
    )
}

export default Login