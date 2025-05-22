import React from 'react';
import { useRef, useState, useEffect } from 'react';

const VideoPage = () => {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true); // AutoPlay is enabled, so start as playing
  
    // Toggle play/pause
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
  
    // Enforce playback rate to prevent speed changes
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.0; // Set to normal speed
        // Periodically enforce playback rate
        const interval = setInterval(() => {
          if (videoRef.current.playbackRate !== 1.0) {
            videoRef.current.playbackRate = 1.0;
          }
        }, 1000);
  
        return () => clearInterval(interval); // Cleanup on unmount
      }
    }, []);
  
    return (
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          className="h-full w-full rounded-lg"
          autoPlay
          muted
          controls={false} // Disable all native controls
          onContextMenu={(e) => e.preventDefault()} // Prevent right-click
        >
          <source src="https://res.cloudinary.com/dgngxuh72/video/upload/v1746428700/Xora_lkmdur.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Custom play/pause button */}
        <div className="absolute bottom-4 left-4">
          <button
            onClick={togglePlay}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg opacity-75 hover:opacity-100"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      )
}

export default VideoPage;