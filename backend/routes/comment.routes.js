import express from 'express';
import {
  addComment,
  getCommentsByVideo,
  deleteComment
} from '../controller/comment.controller.js';
import { protect } from '../middleware/authMiddleware.js';

function commentRoutes(app) {
    app.post('/api/comment', protect, addComment);
    app.get('/api/comment/:videoId', getCommentsByVideo);
    app.delete('/api/comment/:id', protect, deleteComment);
}

export default commentRoutes;
