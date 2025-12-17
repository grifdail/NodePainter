import { EasingFunctionType } from "../../libs/easing"
import { CodeBlockParameterFieldExpression } from "../../Types/CodeBlock/CodeBlockParameterFieldExpression"
import { PortDefinition } from "../../Types/PortDefinition"
import { PortType } from "../../Types/PortType"


export type AnimationSequenceBlockDelay = {
    type: "Delay",
    duration: CodeBlockParameterFieldExpression
}

export type AnimationSequenceBlockLerp = {
    type: "Lerp",
    target: AnimationTarget
    value: CodeBlockParameterFieldExpression,
    duration: CodeBlockParameterFieldExpression,
    easing: EasingFunctionType
}

export type AnimationSequenceBlockLoop = {
    type: "Loop",
    child: null | AnimationSequenceBlock
    count: CodeBlockParameterFieldExpression
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

export type AnimationSequenceBlockReset = {
    type: "Reset",
}

export type AnimationSequenceBlockSequence = {
    type: "Sequence",
    children: AnimationSequenceBlock[]
}

export type AnimationSequenceBlockSet = {
    type: "Set",
    target: AnimationTarget
    value: CodeBlockParameterFieldExpression,
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
