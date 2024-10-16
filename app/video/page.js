"use client"

import { useState, useEffect } from 'react';

export default function Video() {
    const [videoSrc, setVideoSrc] = useState('/videos/hackerFootage/hackerIntroExample.mp4');

    useEffect(() => {
        const checkPasswordStatus = () => {
            const isPasswordCorrect = localStorage.getItem('isPasswordCorrect') === 'true';
            console.log(isPasswordCorrect);
            if (isPasswordCorrect) {
                setVideoSrc('/videos/hackerFootage/hackerOutroExample.mp4');
            } else {
                setVideoSrc('/videos/hackerFootage/hackerIntroExample.mp4');
            }
        };

        checkPasswordStatus();

        window.addEventListener('storage', checkPasswordStatus);

        return () => {
            window.removeEventListener('storage', checkPasswordStatus);
        };
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden">
            <video key={videoSrc} className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]" autoPlay muted loop={videoSrc.includes('hackerIntroExample.mp4')}>
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
}