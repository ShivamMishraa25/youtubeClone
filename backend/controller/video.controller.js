import VideoModel from '../model/video.model.js';
import ChannelModel from '../model/channel.model.js';

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, thumbnail, category } = req.body;

    const channel = await ChannelModel.findOne({ owner: req.user.id });

    const video = await VideoModel.create({
      title,
      description,
      videoLink,
      thumbnail,
      category,
      channel: channel._id
    });

    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find().populate('channel');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id)
      .populate('channel')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username avatar' }
      });

    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVideosByChannel = async (req, res) => {
  try {
    const videos = await VideoModel.find({ channel: req.params.channelId });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const channel = await ChannelModel.findById(video.channel);
    if (channel.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await video.remove();
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
