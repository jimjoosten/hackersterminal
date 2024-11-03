import { useEffect, useRef, useState } from "react";
import GeneralWindow from "@/app/components/GeneralWindow";

export default function SurveillanceWindow() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [playSecurityFootage, setPlaySecurityFootage] = useState(true);
    const videoRef = useRef(null);
    const videoPromise = videoRef.current?.play();

    const videoFiles = ["/videos/securityFootage2.mp4", "/videos/securityFootage3.mp4", "/videos/securityFootage4.mp4", "/videos/securityFootage5.mp4"];

    const playNextVideo = () => {
        if (playSecurityFootage) {
            videoRef.current.src = "/videos/securityFootage1.mp4";
            setPlaySecurityFootage(false);
        } else {
            videoRef.current.src = videoFiles[currentVideoIndex];
            setCurrentVideoIndex((currentVideoIndex + 1) % videoFiles.length);
            setPlaySecurityFootage(true);
        }
        if (videoPromise !== undefined) {
            videoPromise.then(_ => {
                videoRef.current.play();
                console.log("De video is succesvol afgespeeld");
            }).catch(error => {
                console.log("De video kon niet afgespeeld worden" + error);
            });
        }
    };

    useEffect(() => {
        playNextVideo();
    }, []);

    return (
        <GeneralWindow title="Surveillance camera">
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={playNextVideo}
                muted
            />
        </GeneralWindow>
    );
}