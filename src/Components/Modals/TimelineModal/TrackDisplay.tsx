import { useCallback } from "react";
import { AnimationTrack, interpolateAnimation, createDefaultAnimationKeyframe } from "../../../Types/AnimationTrack";
import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { sortedIndex } from "../../../Utils/misc/findSorted";
import { EditedKeyFrame } from "./useTimelineModalControlls";
import { TrackLine } from "./TrackLine";
import { NumberInput } from "../../Generics/Inputs/NumberInput";
import { Button } from "../../Generics/Button";
import { IconTrash } from "@tabler/icons-react";

export function TrackDisplay({ cursor, name, track, setEditedKeyframe, editedKeyframe, onChangeTrack, onMoveCursor }: {
    cursor: number;
    name: string;
    setEditedKeyframe: (trackId: string, v: number) => void;
    track: AnimationTrack;
    editedKeyframe: EditedKeyFrame;
    onChangeTrack: (trackId: string, newTrack: AnimationTrack, selectKey?: number) => void;
    onMoveCursor: (x: number, reset?: boolean) => void
}) {
    const portDescription = PortTypeDefinitions[track.type];
    const Editor = portDescription.inlineInput;
    const Icon = portDescription.icon;
    const isEditing = editedKeyframe && editedKeyframe.track === name;
    const value = isEditing ?
        track.keyframes[editedKeyframe.index].value :
        interpolateAnimation(track, cursor);

    const pos = isEditing ?
        track.keyframes[editedKeyframe.index].pos :
        -1;

    const addKeyFrame = useCallback((pos: number) => {
        var newFrame = createDefaultAnimationKeyframe(track.type);
        newFrame.pos = pos;
        var i = sortedIndex(track.keyframes, pos, a => a.pos);

        onChangeTrack(name, {
            ...track, keyframes: track.keyframes.toSpliced(i, 0, newFrame)
        }, i);

    }, [name, onChangeTrack, track]);



    const onSelectedKeyframe = useCallback((i: number) => {
        setEditedKeyframe(name, i)
    }, [name, setEditedKeyframe]);

    const onRemoveKeyframe = useCallback((i: number) => {
        onChangeTrack(name, {
            ...track,
            keyframes: track.keyframes.toSpliced(i, 1)
        })
    }, [name, onChangeTrack, track]);




    const onEditValue = useCallback((v: any) => {
        if (isEditing) {
            onChangeTrack(name, {
                ...track,
                keyframes: track.keyframes.toSpliced(editedKeyframe.index, 1, {
                    ...track.keyframes[editedKeyframe.index],
                    value: v
                })
            })
        }
    }, [editedKeyframe?.index, isEditing, name, onChangeTrack, track]);


    const onDrag = useCallback((i: number, pos: number) => {
        const newItem = {
            ...track.keyframes[i],
            pos: pos
        }
        const newFrame = track.keyframes.toSpliced(i, 1, newItem).toSorted((a, b) => a.pos - b.pos)
        if (isEditing && editedKeyframe.index === i) {
            const newIndex = newFrame.indexOf(newItem);
            if (newIndex >= 0) {
                return onChangeTrack(name, {
                    ...track,
                    keyframes: newFrame
                }, newIndex)
            }
        }
        onChangeTrack(name, {
            ...track,
            keyframes: newFrame
        })

    }, [editedKeyframe?.index, isEditing, name, onChangeTrack, setEditedKeyframe, track]);




    return <div key={name} className={`track-display ${track.type}`}>
        <div className={`track-info `}>
            <div className="title">
                {Icon && <Icon></Icon>}
                <span>{name}</span>
            </div>
            <div>
                <span>{isEditing ? `Keyframe nº${editedKeyframe.index}` : ""}</span>
                <NumberInput onChange={(v) => { isEditing && onDrag(editedKeyframe.index, v) }} value={pos} disabled={!isEditing}></NumberInput>
                <Button disabled={!isEditing} icon={IconTrash} onClick={() => isEditing && onRemoveKeyframe(editedKeyframe.index)}></Button>
            </div>
            <div>
                {Editor && <Editor onChange={onEditValue} value={value} disabled={!(isEditing)}></Editor>}
            </div>

        </div>

        <TrackLine
            cursor={cursor}
            onMoveCursor={onMoveCursor}
            keyframes={track.keyframes.map(a => a.pos)}
            selected={isEditing ? editedKeyframe.index : null}
            onSelect={onSelectedKeyframe}
            onAddKeyframe={addKeyFrame}
            onDrag={onDrag}
            name={name}
        ></TrackLine>
    </div>;
}
