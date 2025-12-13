import { EasingFunctionType } from "../../libs/easing"
import { PortDefinition } from "../../Types/PortDefinition"
import { PortType } from "../../Types/PortType"


export type AnimationSequenceBlockDelay = {
    type: "Delay",
    duration: number
}

export type AnimationSequenceBlockLerp = {
    type: "Lerp",
    target: AnimationTarget
    value: any,
    duration: number,
    easing: EasingFunctionType
}

export type AnimationSequenceBlockLoop = {
    type: "Loop",
    child: null | AnimationSequenceBlock
    count: number
}

export type AnimationSequenceBlockParallel = {
    type: "Parallel",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockSequence = {
    type: "Sequence",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockSet = {
    type: "Set",
    target: AnimationTarget
    value: any,
}

export type AnimationTarget = {
    type: PortType
    id: string
    location: "inputs" | "properties"
}

export type AnimationSequenceBlock =
    | AnimationSequenceBlockDelay
    | AnimationSequenceBlockLerp
    | AnimationSequenceBlockLoop
    | AnimationSequenceBlockParallel
    | AnimationSequenceBlockSequence
    | AnimationSequenceBlockSet

export type AnimationSequenceBlockType = AnimationSequenceBlock["type"]

export type AnimationSequenceData = {
    root: AnimationSequenceBlockSequence;
    inputVariables: PortDefinition[];
    properties: PortDefinition[];
};
