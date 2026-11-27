
import { AdditiveBlending, BackSide, Blending, DoubleSide, FrontSide, Material, MeshBasicMaterial, MultiplyBlending, NoBlending, NormalBlending, SubtractiveBlending } from "three";
import { FakeMaterialData } from "../../../Types/MaterialData";
import { NodeData } from "../../../Types/NodeData";
import { SettingDefinition } from "../../../Types/SettingDefinition";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../../Utils/graph/execution/createExecutionContext";
import { toThreeColor } from "../../../Utils/math/colorUtils";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export type MaterialGenericSetting = {
    blendingMode: "NoBlending" | "NormalBlending" | "AdditiveBlending" | "SubtractiveBlending" | "MultiplyBlending";
    transparent: boolean;
    side: "FrontSide" | "BackSide" | "DoubleSide";
    alphaTest: 0;
    flatShading: boolean;
    wireframe: boolean;
};


export function createMaterialSetting(): SettingDefinition {
    return {
        type: "group",
        id: "material",
        defaultValue: createDefaultMaterialGenericData(),
        settings: [
            { id: "blendingMode", type: "dropdown", defaultValue: "NormalBlending", options: ["NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending"] },
            { id: "alphaTest", type: "number", defaultValue: 0, constrains: [Constraints.Clamp01()] },
            { id: "transparent", type: "bool", defaultValue: false },
            { id: "flatShading", type: "bool", defaultValue: false },
            { id: "wireframe", type: "bool", defaultValue: false },
            { id: "side", type: "dropdown", defaultValue: "FrontSide", options: ["FrontSide", "BackSide", "DoubleSide"] },
        ],
    };
}

export function toThreeSetting({ blendingMode, side, ...rest }: MaterialGenericSetting) {
    return { ...rest, blending: convertToThreeBlending(blendingMode), side: convertToThreeSide(side) };
}
function convertToThreeBlending(blendingMode: "NoBlending" | "NormalBlending" | "AdditiveBlending" | "SubtractiveBlending" | "MultiplyBlending"): Blending {
    switch (blendingMode) {
        case "NoBlending":
            return NoBlending;
        case "NormalBlending":
            return NormalBlending;
        case "AdditiveBlending":
            return AdditiveBlending;
        case "SubtractiveBlending":
            return SubtractiveBlending;
        case "MultiplyBlending":
            return MultiplyBlending;
    }
}
function convertToThreeSide(side: "FrontSide" | "BackSide" | "DoubleSide") {
    switch (side) {
        case "FrontSide":
            return FrontSide;
        case "BackSide":
            return BackSide;
        case "DoubleSide":
            return DoubleSide;
    }
}

export function updateTreeMaterial(mat: Material, changeRaw: MaterialGenericSetting) {
    const change = toThreeSetting(changeRaw);
    if (mat.alphaTest !== change.alphaTest) {
        mat.alphaTest = change.alphaTest;
        mat.needsUpdate = true;
    }
    if (mat.transparent !== change.transparent) {
        mat.transparent = change.transparent;
        mat.needsUpdate = true;
    }
    if (mat.blending !== change.blending) {
        mat.blending = change.blending;
        mat.needsUpdate = true;
    }
    if (mat.side !== change.side) {
        mat.side = change.side;
        mat.needsUpdate = true;
    }
    var matAny = mat as any;
    if (matAny.wireframe !== undefined && matAny.wireframe !== change.wireframe) {
        matAny.wireframe = change.wireframe;
        mat.needsUpdate = true;
    }
    if (matAny.flatShading !== undefined && matAny.flatShading !== change.flatShading) {
        matAny.flatShading = change.flatShading;
        mat.needsUpdate = true;
    }
}


export function createDefaultMaterialGenericData(): MaterialGenericSetting {
    return {
        blendingMode: "NormalBlending",
        transparent: false,
        side: "FrontSide",
        alphaTest: 0,
        flatShading: false,
        wireframe: false,
    };
}


export function processMaterial(mat: FakeMaterialData | Material | null, context: ExecutionContext, node: NodeData) {
    if (!mat) {
        return null;
    }
    if ("isMaterial" in mat) {
        return mat;
    }
    const m = readFromCacheWithVersion(context, node, () => {
        return new MeshBasicMaterial({ color: toThreeColor(mat.color) });
    }, undefined, "materialInput")
    m.color.set(toThreeColor(mat.color))
    return m;
}