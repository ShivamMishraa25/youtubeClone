import express from 'express';
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getVideosByChannel,
  deleteVideo
} from '../controller/video.controller.js';
import { protect } from '../middleware/authMiddleware.js';

function videoRoutes(app) {
    app.post('/api/video', protect, uploadVideo);
    app.get('/api/videos', getAllVideos);
    app.get('/api/video/:id', getVideoById);
    app.get('/api/videos/:channelId', getVideosByChannel);
    app.delete('/api/video/:id', protect, deleteVideo);
}

export default videoRoutes;
