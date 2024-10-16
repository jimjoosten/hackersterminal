"use client"

import {useEffect, useRef, useState} from 'react';
import CompilerWindow from './components/CompilerWindow';
import SurveillanceWindow from "@/app/components/SurveillanceWindow";
import ConsoleWindow from "@/app/components/ConsoleWindow";
import WarningWindow from "@/app/components/WarningWindow";
import BinaryWindow from "@/app/components/BinaryWindow";
import LiveWindow from "@/app/components/LiveWindow";
import RadarWindow from "@/app/components/RadarWindow";

const correctPassword = "software en media";

export default function Home() {
    const [input, setInput] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const [showCompiler, setShowCompiler] = useState(false);
    const [showSurveillance, setShowSurveillance] = useState(false);
    const [showConsole, setShowConsole] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showBinary, setShowBinary] = useState(false);
    const [showLive, setShowLive] = useState(false);
    const [showRadar, setShowRadar] = useState(false);

    const [hideCompiler, setHideCompiler] = useState(false);
    const [hideSurveillance, setHideSurveillance] = useState(false);
    const [hideConsole, setHideConsole] = useState(false);
    const [hideWarning, setHideWarning] = useState(false);
    const [hideBinary, setHideBinary] = useState(false);
    const [hideLive, setHideLive] = useState(false);
    const [hideRadar, setHideRadar] = useState(false);

    const hideAllWindows = () => {
        setTimeout(() => setHideCompiler(true), 1000);
        setTimeout(() => setHideSurveillance(true), 2000);
        setTimeout(() => setHideConsole(true), 3000);
        setTimeout(() => setHideWarning(true), 4000);
        setTimeout(() => setHideBinary(true), 5000);
        setTimeout(() => setHideLive(true), 6000);
        setTimeout(() => setHideRadar(true), 7000);
    };

    const showAllWindows = () => {
        setTimeout(() => setShowCompiler(true), 1000);
        setTimeout(() => setShowSurveillance(true), 2000);
        setTimeout(() => setShowConsole(true), 3000);
        setTimeout(() => setShowWarning(true), 4000);
        setTimeout(() => setShowBinary(true), 5000);
        setTimeout(() => setShowLive(true), 6000);
        setTimeout(() => setShowRadar(true), 7000);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (input === correctPassword) {
                setIsPasswordCorrect(true);
                hideAllWindows();
                localStorage.setItem('isPasswordCorrect', 'true');
            } else {
                setIsLocked(true);
                setTimeout(() => {
                    setIsLocked(false);
                    setInput('');
                }, 5000);
            }
        }, 3000);
    };

    useEffect(() => {
        inputRef.current.focus();
        localStorage.clear();
        showAllWindows();
    }, []);

    return (<div className="bg-black text-hackerText min-h-screen p-8 pb-20 gap-16 sm:p-20 font-mono relative">
        <main className="flex flex-col gap-8 items-center sm:items-start w-full relative">
            <div className="w-full">
                <p className="mb-4 font-bold text-4xl">Ben jij klaar om de AI te verslaan? Vul dan hier het
                    wachtwoord in en vernietig de AI!</p>
                <form onSubmit={handlePasswordSubmit} className="relative w-full">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-black font-normal text-xl text-hackerText border-none focus:outline-none"
                        placeholder="Vul hier het wachtwoord in... en druk op enter"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLocked || isLoading}
                    />
                </form>
            </div>

            {isLoading && (<div className="w-full h-4">
                <div className="bg-hackerText h-4 animate-loading-bar"></div>
            </div>)}

            {showCompiler && !hideCompiler && <CompilerWindow/>}
            {showSurveillance && !hideSurveillance && <SurveillanceWindow/>}
            {showConsole && !hideConsole && <ConsoleWindow/>}
            {showWarning && !hideWarning && <WarningWindow/>}
            {showBinary && !hideBinary && <BinaryWindow/>}
            {showLive && !hideLive && <LiveWindow/>}
            {showRadar && !hideRadar && <RadarWindow/>}

            {isLocked && (<p className="text-red-600 text-2xl">Dit is niet het juiste wachtwoord!</p>)}
            {isPasswordCorrect && (
                <p className="text-hackerText text-2xl">Dit is het juiste wachtwoord jullie hebben de AI
                    verslagen!</p>)}
        </main>
    </div>);
}
