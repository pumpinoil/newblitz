import React from 'react';

interface VideoPlayerProps {
  url?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url = 'https://www.youtube.com/embed/dQw4w9WgXcQ' }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    </div>
  );
};

export default VideoPlayer;