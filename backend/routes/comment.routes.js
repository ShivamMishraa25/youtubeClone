import express from 'express';
import {
  addComment,
  getCommentsByVideo,
  deleteComment
} from '../controller/comment.controller.js';
import { protect } from '../middleware/authMiddleware.js';

function commentRoutes(app) {
    app.post('/', protect, addComment);
    app.get('/video/:videoId', getCommentsByVideo);
    app.delete('/:id', protect, deleteComment);
}

export default commentRoutes;
