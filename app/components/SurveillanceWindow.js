/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from "react";
import GeneralWindow from "@/app/components/GeneralWindow";

export default function SurveillanceWindow() {
    const [, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    const videoFiles = ["/videos/securityFootage1.mp4", "/videos/securityFootage2.mp4", "/videos/securityFootage3.mp4"];

    const playRandomVideo = () => {
        const randomIndex = Math.floor(Math.random() * videoFiles.length);
        setCurrentVideoIndex(randomIndex);
        if (videoRef.current) {
            videoRef.current.src = videoFiles[randomIndex];
            videoRef.current.play();
            console.log("Playing video", videoFiles[randomIndex]);
        }
    };

    useEffect(() => {
        playRandomVideo();
    }, []);

    return (<GeneralWindow title="Surveillance camera">
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={playRandomVideo}
                muted
            />
        </GeneralWindow>);
}