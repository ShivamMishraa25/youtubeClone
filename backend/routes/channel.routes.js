import express from 'express';
import {
  createChannel,
  getChannelById,
  getChannelByUser,
  updateChannel,
  deleteChannel
} from '../controller/channel.controller.js';
import { protect } from '../middleware/authMiddleware.js';

function channelRoutes(app) {
    app.post('/', protect, createChannel); // create a channel
    app.get('/:id', getChannelById);       // public
    app.get('/user/:userId', getChannelByUser); // optional
    app.put('/:id', protect, updateChannel);
    app.delete('/:id', protect, deleteChannel);
}

export default channelRoutes;
