'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function VideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fallback: if video is already ready when component mounts (cached case)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className={styles.heroVideoBackground}>
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        playsInline 
        loop 
        preload="auto" 
        controls={false}
        onCanPlay={handleVideoLoad}
        style={{ opacity: videoLoaded ? 0.34 : 0, transition: 'opacity 2s ease-out' }}
      >
        <source
          src="https://koklgwni3prbahdf.public.blob.vercel-storage.com/whale-creek-drone-footy.mov"
          type="video/mp4"
        />
      </video>
    </div>
  );
}