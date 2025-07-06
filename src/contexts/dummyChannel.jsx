export const dummyChannel = {
  _id: "channel01",
  channelName: "Code with Shivam",
  description: "Shivam's development tutorials and tech content.",
  channelPic: "https://placehold.co/100x100.png?text=S",
  channelBanner: "https://placehold.co/600x150.png?text=Banner",
  owner: "user01", // user._id from context
  subscribers: 310,
  videos: [
    {
      _id: "video123",
      title: "React Crash Course",
      videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      thumbnail: "https://placehold.co/150x100.png?text=React",
      description: "A short intro to React.",
      views: 15200,
      likes: 320,
      dislikes: 5,
      uploadDate: "2024-09-20"
    },
    {
      _id: "video124",
      title: "Express JS Basics",
      videoLink: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      thumbnail: "https://placehold.co/150x100.png?text=Express",
      description: "Learn how Express routing works.",
      views: 8400,
      likes: 190,
      dislikes: 2,
      uploadDate: "2024-09-22"
    }
  ]
};
