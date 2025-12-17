import { EasingFunctionType } from "../../libs/easing"
import { CodeBlockParameterFieldExpression } from "../../Types/CodeBlock/CodeBlockParameterFieldExpression"
import { PortDefinition } from "../../Types/PortDefinition"
import { PortType } from "../../Types/PortType"


export type AnimationSequenceBlockDelay = {
    id: string,
    type: "Delay",
    duration: CodeBlockParameterFieldExpression
}

export type AnimationSequenceBlockLerp = {
    id: string,
    type: "Lerp",
    target: AnimationTarget
    value: CodeBlockParameterFieldExpression,
    duration: CodeBlockParameterFieldExpression,
    easing: EasingFunctionType
}

export type AnimationSequenceBlockLoop = {
    id: string,
    type: "Loop",
    child: null | AnimationSequenceBlock
    count: CodeBlockParameterFieldExpression
}

export type AnimationSequenceBlockLoopForever = {
    id: string,
    type: "LoopForever",
    child: null | AnimationSequenceBlock
}

export type AnimationSequenceBlockLoopUntil = {
    id: string,
    type: "LoopUntil",
    child: null | AnimationSequenceBlock,
    condition: CodeBlockParameterFieldExpression,
}

export type AnimationSequenceBlockParallel = {
    id: string,
    type: "Parallel",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockPickRandom = {
    id: string,
    type: "PickRandom",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockRace = {
    id: string,
    type: "Race",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockReset = {
    id: string,
    type: "Reset",
}

export type AnimationSequenceBlockSequence = {
    id: string,
    type: "Sequence",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockSet = {
    id: string,
    type: "Set",
    target: AnimationTarget
    value: CodeBlockParameterFieldExpression,
}

export type AnimationSequenceBlockWaitUntil = {
    id: string,
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
    | AnimationSequenceBlockReset
    | AnimationSequenceBlockSequence
    | AnimationSequenceBlockSet
    | AnimationSequenceBlockWaitUntil

export type AnimationSequenceBlockType = AnimationSequenceBlock["type"]

export type AnimationSequenceData = {
    root: AnimationSequenceBlockSequence;
    inputVariables: PortDefinition[];
    properties: PortDefinition[];
};
