import { useState, useCallback } from "react";
import { PortDefinition } from "../../../Types/PortDefinition";
import { AnimationSequenceData, AnimationSequenceBlockSequence } from "../../../Utils/animationSequence/AnimationSequenceData";
import { TimelineData } from "../../../Utils/timeline/TimelineData";
import { AnimationTrack, createDefaultAnimationTrack } from "../../../Types/AnimationTrack";
import { PortType } from "../../../Types/PortType";

export type EditedKeyFrame = null | {
    track: string;
    index: number;
};

export function useTimelineModalControlls(defaultValue: TimelineData) {
    const [timeline, setTimeline] = useState(defaultValue);
    const [cursor, setCursorRaw] = useState(0)


    const [editedKeyframe, setEditedKeyFrameRaw] = useState<EditedKeyFrame>(null)

    const setCursor = useCallback((position: number, reset: boolean = true) => {
        setCursorRaw(position);
        if (reset) {
            setEditedKeyFrameRaw(null);
        }
    }, [])

    const setKeyframe = useCallback((track: string, index: number) => {
        var keyFrame = timeline[track]?.keyframes[index]
        if (keyFrame) {
            setCursorRaw(keyFrame.pos);

            setEditedKeyFrameRaw({ track, index });
        }

    }, [timeline])

    const addTrack = useCallback((name: string, type: PortType) => {
        setTimeline({
            ...timeline,
            [name]: createDefaultAnimationTrack(type)
        })
    }, [timeline])

    const setTrack = useCallback((name: string, t: AnimationTrack, selectKey?: number) => {

        setTimeline({
            ...timeline,
            [name]: t
        })
        if (selectKey !== undefined) {
            var keyFrame = t?.keyframes[selectKey]
            setCursorRaw(keyFrame.pos);
            setEditedKeyFrameRaw({ track: name, index: selectKey });
        }
    }, [timeline])


    return { timeline, cursor, setCursor, addTrack, editedKeyframe, setKeyframe, setTrack };
}
