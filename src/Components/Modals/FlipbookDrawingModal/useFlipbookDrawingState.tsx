import { useCallback, useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { Flipbook, FlipbookLine } from "../../../Types/FlipBook";
import { createColor } from "../../../Types/vectorDataType";

export const useFlipbookDrawingState = (defaultValue: Flipbook) => {



    //Line width, in percentage of the width
    const [lineWidth, setLineWidth] = useState(0.05);
    const [palette, setPalette] = useState(usePlayerPref.getState().colorPreset);
    const [color, setColor] = useState(createColor(0, 0, 0, 1));
    const [frame, setFrameRaw] = useState(0);
    const [fps, setFPSRaw] = useState(12);
    const [playMode, setPlayMode] = useState<"pause" | "play">("pause");
    const [drawMode, setDrawMode] = useState<"draw" | "erase">("draw");
    const [onionSkinMode, setOnionSkinMode] = useState<"none" | "past" | "futur" | "both">("past");

    const [editedAnimation, setEditedAnimation] = useState<Flipbook>(defaultValue);

    const setFrame = useCallback((newFrame: number) => {
        setFrameRaw(Math.max(0, Math.floor(newFrame)) % editedAnimation.length);
    }, [editedAnimation.length]);

    const addFrame = useCallback(() => {
        setEditedAnimation([...editedAnimation, []]);
        setFrameRaw(editedAnimation.length);
    }, [editedAnimation]);

    const removeFrame = useCallback((frameIndex?: number) => {
        frameIndex = frameIndex === undefined ? frame : frameIndex;
        setEditedAnimation(editedAnimation.toSpliced(frameIndex, 1));
    }, [editedAnimation, frame]);

    const addLine = useCallback((line: FlipbookLine, frameIndex?: number) => {
        if (line.points.length === 0) {
            return;
        }
        frameIndex = frameIndex === undefined ? frame : frameIndex;
        setEditedAnimation(editedAnimation.toSpliced(frameIndex, 1, [...editedAnimation[frameIndex], line]));
    }, [editedAnimation, frame]);

    const removeLine = useCallback((lineIndex: number, frameIndex?: number) => {

        frameIndex = frameIndex === undefined ? frame : frameIndex;
        setEditedAnimation(editedAnimation.toSpliced(frameIndex, 1, editedAnimation[frameIndex].toSpliced(lineIndex, 0)));
    }, [editedAnimation, frame]);

    const setFPS = useCallback((value: number) => {
        if (value > 0) {
            setFPSRaw(value);
        }
    }, []);

    const clear = useCallback(() => {
        setEditedAnimation([[]]);
        setFrame(0);
        setPlayMode("pause");
    }, [setFrame]);

    const togglePlayMode = useCallback(() => {
        setPlayMode(playMode === "pause" ? "play" : "pause");
    }, [playMode]);


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
