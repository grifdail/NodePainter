import { Monaco } from "@monaco-editor/react";
import { Delaunay } from "d3-delaunay";
import { createColor, createVector2, createVector3, createVector4 } from "../../Types/vectorDataType";
import { hsvToRgb, invertColor } from "../math/colorUtils";
import { vectorAbsolute, vectorAddition, vectorCrossProduct, vectorDistance, vectorDivision, vectorDotProduct, vectorLerp, vectorMagnitude, vectorNormalize, vectorProject, vectorReflect, vectorReject, vectorScale, vectorSquareDistance, vectorSquareMagnitude, vectorSubstraction } from "../math/vectorUtils";


const GlobalScope = {
    createVector2,
    createVector3,
    createVector4,
    createColor,

    vectorAddition,
    vectorAbsolute,
    vectorDistance,
    vectorScale,
    vectorSubstraction,
    vectorDivision,
    vectorNormalize,
    vectorSquareDistance,
    vectorMagnitude,
    vectorSquareMagnitude,
    vectorReflect,
    vectorProject,
    vectorReject,
    vectorLerp,
    vectorDotProduct,
    vectorCrossProduct,

    invertColor,
    hsvToRgb,

    Delaunay
}

export function createDependencyProposals(range: { startLineNumber: number; endLineNumber: number; startColumn: number; endColumn: number; }, monaco: Monaco) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return Object.entries(GlobalScope).map(([name, value]) => (
        {
            label: name,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${name}()`,
            range: range,
        }),
    );
}

export function evalFunction(code: string) {
    var fullCode = `
        ${Object.keys(GlobalScope).map(key => `const ${key} = GlobalScope.${key};`).join("\n")}
        
        ${code}`;


    // eslint-disable-next-line no-new-func
    var fn = new Function("GlobalScope", fullCode);
    return fn(GlobalScope);
}