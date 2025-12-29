"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./VideoBackground.module.css";

const videos = [
  {
    id: 1,
    title: "Residential Renovation",
    src: "https://koklgwni3prbahdf.public.blob.vercel-storage.com/whale-creek-drone-footy.mov",
    location: "Noblesville, Indiana",
  },
];

export default function VideoBackground() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleVideoLoad = (index) => {
    setVideoLoaded((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const goToVideo = (index) => {
    setCurrentVideo(index);
  };

  return (
    <div className={styles.videoCarousel}>
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`${styles.videoSlide} ${
            index === currentVideo ? styles.active : ""
          }`}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            controls={false}
            onCanPlay={() => handleVideoLoad(index)}
            style={{
              opacity: videoLoaded[index] ? 0.9 : 0,
              transition: "opacity 2s ease-out",
            }}
            className={styles.video}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        </div>
      ))}

      <div className={styles.projectInfo}>
        <h3 className={styles.projectTitle}>{videos[currentVideo].title}</h3>
        <p className={styles.projectLocation}>
          {videos[currentVideo].location}
        </p>
        <div className={styles.bottomAlign}>
          <Link href="/project-gallery" className={styles.learnMore}>
            <span>Learn More</span>
            <svg
              className={styles.learnMoreIcon}
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"
              />
            </svg>
          </Link>
        </div>
      </div>

      {videos.length > 1 && (
        <div className={styles.videoDots}>
          {videos.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentVideo ? styles.dotActive : ""
              }`}
              onClick={() => goToVideo(index)}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
