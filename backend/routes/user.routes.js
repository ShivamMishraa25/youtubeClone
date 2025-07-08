import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile
} from '../controller/user.controller.js';

function userRoutes(app) {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.get('/profile', getUserProfile); // protected (requires JWT)
}

export default userRoutes;
