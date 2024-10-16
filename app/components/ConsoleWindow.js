import {useEffect, useState} from "react";
import {consoleLog} from "@/public/logs/consolelog";
import GeneralWindow from "@/app/components/GeneralWindow";

export default function ConsoleWindow() {
    const [output, setOutput] = useState("");
    const maxLogLength = 1000; // Set the maximum length for the log

    const generateRandomLog = () => {
        return consoleLog[Math.floor(Math.random() * consoleLog.length)];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = generateRandomLog();
            setOutput((prev) => {
                const updatedOutput = prev + newLog + "\n";
                return updatedOutput.length > maxLogLength ? updatedOutput.slice(updatedOutput.length - maxLogLength) : updatedOutput;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (<GeneralWindow title="Console" backgroundImage="hackerBackground1">
            {output || "0.000000 Toegang verleend tot het Astrum College systeem...\n"}
        </GeneralWindow>);
}