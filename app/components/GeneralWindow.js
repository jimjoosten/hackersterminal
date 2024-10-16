import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export default function GeneralWindow({ title, children, backgroundImage }) {
    const scrollRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zIndex, setZIndex] = useState(1);

    const getRandomPosition = () => {
        const x = Math.floor(Math.random() * (window.innerWidth - 600));
        const y = Math.floor(Math.random() * (window.innerHeight - 400));
        return { x, y };
    };

    useEffect(() => {
        setPosition(getRandomPosition());
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [children]);

    const bringToFront = () => {
        setZIndex(prevZIndex => prevZIndex + 1);
    };

    return (
        <Draggable handle=".windowHeader" defaultPosition={position} onStart={bringToFront}>
            <div className="windowHeader bg-hackerText text-hackerText border-4 border-hackerText rounded-md font-mono w-[500px] h-[300px] absolute cursor-move bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(/images/${backgroundImage}.gif)`,
                    top: position.y,
                    left: position.x,
                    zIndex: zIndex,
                }}
            >
                <div className="flex justify-between items-center bg-hackerText cursor-move">
                    <strong className="text-black">{title}</strong>
                </div>
                <div ref={scrollRef}
                     className="windowContent p-2 overflow-hidden h-[calc(100%-1.7rem)] text-hackerText font-mono text-xs relative whitespace-pre-wrap">
                    {children}
                </div>
            </div>
        </Draggable>
    );
}