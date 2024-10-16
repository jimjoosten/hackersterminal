import {useEffect, useState} from "react";
import {compilerLog} from "@/public/logs/hackerlog";
import GeneralWindow from "@/app/components/GeneralWindow";

export default function CompilerWindow() {
    const [output, setOutput] = useState("");
    const maxLogLength = 1000; // Set the maximum length for the log

    const generateRandomLog = () => {
        return compilerLog[Math.floor(Math.random() * compilerLog.length)];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = generateRandomLog();
            setOutput((prev) => {
                const updatedOutput = prev + newLog + "\n";
                return updatedOutput.length > maxLogLength ? updatedOutput.slice(updatedOutput.length - maxLogLength) : updatedOutput;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (<GeneralWindow title="Compiler" backgroundImage="hackerBackground2">
        {output || "0.000000 Toegang verleend tot het Astrum College systeem...\n"}
    </GeneralWindow>);
}