import React from "react";

type YouTubeThumbnailProps = {
  videoId: string;
};

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({ videoId }) => {
  if (!videoId) return <p>No video ID provided</p>;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="flex flex-col items-center p-2">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnailUrl}
          alt="YouTube Thumbnail"
          className="rounded-lg shadow-lg hover:opacity-80 transition duration-200"
        />
      </a>
    </div>
  );
};

export default YouTubeThumbnail;