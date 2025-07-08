import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/registerLogin.css'
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios'

function Login() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: handle login logic

        try {
            const { data } = await axios.post(
                "http://localhost:5100/api/login",
                form,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            // Backend response includes: _id, username, email, avatar, token, maybe channel
            setUser(data); // This will trigger useEffect to store it in localStorage
            navigate("/");

        } catch (err) {
            console.error("❌ Login failed:", err.response?.data?.message || err.message);
            alert("Login failed: " + (err.response?.data?.message || "Something went wrong"));
        }
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
                    placeholder='email'
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
                    placeholder='password'
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