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
    app.post('/', protect, uploadVideo);
    app.get('/', getAllVideos);
    app.get('/:id', getVideoById);
    app.get('/channel/:channelId', getVideosByChannel);
    app.delete('/:id', protect, deleteVideo);
}

export default videoRoutes;
