import { EasingFunctionType } from "../../libs/easing"
import { CodeBlockParameterFieldExpression } from "../../Types/CodeBlock/CodeBlockParameterFieldExpression"
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

export type AnimationSequenceBlockLoopForever = {
    type: "LoopForever",
    child: null | AnimationSequenceBlock
}

export type AnimationSequenceBlockLoopUntil = {
    type: "LoopUntil",
    child: null | AnimationSequenceBlock,
    condition: CodeBlockParameterFieldExpression,
}

export type AnimationSequenceBlockParallel = {
    type: "Parallel",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockPickRandom = {
    type: "PickRandom",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockRace = {
    type: "Race",
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

export type AnimationSequenceBlockWaitUntil = {
    type: "WaitUntil",
    condition: CodeBlockParameterFieldExpression,
}



export type AnimationTarget = {
    type: PortType
    id: string
    location: "inputs" | "properties"
}


export type AnimationCondition = {
    target: AnimationTarget
}

export type AnimationSequenceBlock =
    | AnimationSequenceBlockDelay
    | AnimationSequenceBlockLerp
    | AnimationSequenceBlockLoop
    | AnimationSequenceBlockLoopForever
    | AnimationSequenceBlockLoopUntil
    | AnimationSequenceBlockParallel
    | AnimationSequenceBlockPickRandom
    | AnimationSequenceBlockRace
    | AnimationSequenceBlockSequence
    | AnimationSequenceBlockSet
    | AnimationSequenceBlockWaitUntil

export type AnimationSequenceBlockType = AnimationSequenceBlock["type"]

export type AnimationSequenceData = {
    root: AnimationSequenceBlockSequence;
    inputVariables: PortDefinition[];
    properties: PortDefinition[];
};
