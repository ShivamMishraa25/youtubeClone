import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile
} from '../controller/user.controller.js';

function userRoutes(app) {
    app.post('/api/register', registerUser);
    app.post('/api/login', loginUser);
    app.get('/api/profile', getUserProfile); // protected (requires JWT)
}

export default userRoutes;
