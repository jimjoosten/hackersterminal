"use client";

import { useState, useEffect, useRef } from 'react';

export default function Video() {
    const [videoSrc, setVideoSrc] = useState('/videos/hackerFootage/Deel_1_v1.mp4');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [firstVideoPlayed, setFirstVideoPlayed] = useState(false);
    const [canPlay, setCanPlay] = useState(false);
    const videoRef = useRef();

    useEffect(() => {
        const checkPasswordStatus = () => {
            const passwordStatus = localStorage.getItem('isPasswordCorrect') === 'true';
            setIsPasswordCorrect(passwordStatus);
        };

        checkPasswordStatus();

        window.addEventListener('storage', checkPasswordStatus);

        return () => {
            window.removeEventListener('storage', checkPasswordStatus);
        };
    }, []);

    useEffect(() => {
        if (isPasswordCorrect) {
            setVideoSrc('/videos/hackerFootage/Deel_3_v2.mp4');
        } else if (!firstVideoPlayed) {
            setVideoSrc('/videos/hackerFootage/Deel_1_v1.mp4');
            setTimeout(() => {
                setFirstVideoPlayed(true);
            }, 20000);
        } else {
            setVideoSrc('/videos/hackerFootage/Deel_2_v1.mp4');
        }
    }, [isPasswordCorrect, firstVideoPlayed]);

    const handlePlayButtonClick = () => {
        setCanPlay(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden">
            {!canPlay && (
                <button onClick={handlePlayButtonClick} className="z-10 p-2 bg-blue-500 text-white rounded">
                    Play Video
                </button>
            )}
            <video
                ref={videoRef}
                key={videoSrc}
                className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
                autoPlay={canPlay}
                muted={!canPlay}
                loop
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
}