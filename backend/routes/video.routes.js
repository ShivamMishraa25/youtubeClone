import express from 'express';
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getVideosByChannel,
  deleteVideo,
  likeVideo,
  unlikeVideo,
  dislikeVideo,
  undislikeVideo,
  updateVideo
} from '../controller/video.controller.js';
import { protect } from '../middleware/authMiddleware.js';

function videoRoutes(app) {
    app.post('/api/video', protect, uploadVideo);
    app.get('/api/videos', getAllVideos);
    app.get('/api/video/:id', getVideoById);
    app.get('/api/videos/:channelId', getVideosByChannel);
    app.delete('/api/video/:id', protect, deleteVideo);

    // Like/dislike endpoints
    app.patch('/api/video/:id/like', protect, likeVideo);
    app.patch('/api/video/:id/unlike', protect, unlikeVideo);
    app.patch('/api/video/:id/dislike', protect, dislikeVideo);
    app.patch('/api/video/:id/undislike', protect, undislikeVideo);

    // Update video endpoint
    app.put('/api/video/:id', protect, updateVideo);
}

export default videoRoutes;
