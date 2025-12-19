import { useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { Flipbook, FlipbookLine } from "../../../Types/FlipBook";
import { createColor } from "../../../Types/vectorDataType";

export const useFlipbookDrawingState = (defaultValue: Flipbook) => {



    //Line width, in percentage of the width
    const [lineWidth, setLineWidth] = useState(0.1);
    const [palette, setPalette] = useState(usePlayerPref.getState().colorPreset);
    const [color, setColor] = useState(createColor(0, 0, 0, 1));
    const [frame, setFrameRaw] = useState(0);
    const [fps, setFPSRaw] = useState(12);
    const [playMode, setPlayMode] = useState<"pause" | "play">("pause");
    const [drawMode, setDrawMode] = useState<"draw" | "erase">("draw");
    const [onionSkinMode, setOnionSkinMode] = useState<"none" | "past" | "futur" | "both">("past");

    const [editedAnimation, setEditedAnimation] = useState<Flipbook>(defaultValue);

    const setFrame = (newFrame: number) => {
        setFrameRaw(Math.max(0, Math.floor(newFrame)) % editedAnimation.length);
    };

    const addFrame = () => {
        setEditedAnimation([...editedAnimation, []]);
        setFrameRaw(editedAnimation.length);
    };
    const removeFrame = (frameIndex?: number) => {
        frameIndex = frameIndex === undefined ? frame : frameIndex;
        setEditedAnimation(editedAnimation.toSpliced(frameIndex, 1));
    };

    const addLine = (line: FlipbookLine, frameIndex?: number) => {
        if (line.points.length === 0) {
            return;
        }
        frameIndex = frameIndex === undefined ? frame : frameIndex;
        setEditedAnimation(editedAnimation.toSpliced(frameIndex, 1, [...editedAnimation[frameIndex], line]));
    };

    const removeLine = (lineIndex: number, frameIndex?: number) => {

        frameIndex = frameIndex === undefined ? frame : frameIndex;
        setEditedAnimation(editedAnimation.toSpliced(frameIndex, 1, editedAnimation[frameIndex].toSpliced(lineIndex, 0)));
    };

    const setFPS = (value: number) => {
        if (value > 0) {
            setFPSRaw(value);
        }
    };

    const clear = () => {
        setEditedAnimation([[]]);
        setFrame(0);
        setPlayMode("pause");
    };

    const togglePlayMode = () => {
        setPlayMode(playMode === "pause" ? "play" : "pause");
    };


    return {
        lineWidth, setLineWidth,
        color, setColor,
        animation: editedAnimation,
        frame,
        setFrame, addFrame, removeFrame,
        addLine, removeLine,
        fps, setFPS,
        playMode, setPlayMode, togglePlayMode,
        drawMode, setDrawMode,
        palette, setPalette,
        onionSkinMode, setOnionSkinMode,
        clear,
    };
};
