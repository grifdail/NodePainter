import { AdditiveBlending, BackSide, Blending, DoubleSide, FrontSide, Material, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, MultiplyBlending, NoBlending, NormalBlending, RGBDepthPacking, SubtractiveBlending, Texture } from "three";
import { ImageData } from "../../../Types/ImageData";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { Color } from "../../../Types/vectorDataType";
import { Black, toThreeColor, White } from "../../../Utils/math/colorUtils";
import { MaterialGenericData } from "./MaterialGenericData";
import { MaterialVirtualNodeType } from "./MaterialVirtualNodeType";

export function toThreeSetting({ blendingMode, side, ...rest }: MaterialGenericData) {
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

export function updateTreeMaterial(mat: Material, changeRaw: MaterialGenericData) {
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

export class FlatMaterialType extends MaterialVirtualNodeType<MeshBasicMaterial, [color: Color, mat: MaterialGenericData]> {
    getId(): string {
        return "FlatMaterial";
    }
    getDescription(): string {
        return "Render an object with solid color, ignoring light";
    }
    create(color: Color, mat: MaterialGenericData): MeshBasicMaterial {
        return new MeshBasicMaterial({ color: toThreeColor(color), ...toThreeSetting(mat) });
    }
    remove(element: MeshBasicMaterial): void {
        element.dispose();
    }
    update(element: MeshBasicMaterial, color: Color, mat: MaterialGenericData): void {
        element.color.set(toThreeColor(color));
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [
            {
                id: "color",
                type: "color",
                defaultValue: White(),
            },
        ];
    }
}

export class LambertMaterialType extends MaterialVirtualNodeType<MeshLambertMaterial, [color: Color, emissive: Color, mat: MaterialGenericData]> {
    getId(): string {
        return "LambertMaterial";
    }
    getDescription(): string {
        return "Render an object with a very basic light model";
    }
    create(color: Color, emissive: Color, mat: MaterialGenericData): MeshLambertMaterial {
        return new MeshLambertMaterial({ color: toThreeColor(color), emissive: toThreeColor(emissive), ...toThreeSetting(mat) });
    }
    remove(element: MeshLambertMaterial): void {
        element.dispose();
    }
    update(element: MeshLambertMaterial, color: Color, emissive: Color, mat: MaterialGenericData): void {
        element.color.set(toThreeColor(color));
        element.emissive.set(toThreeColor(emissive));
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [
            {
                id: "color",
                type: "color",
                defaultValue: White(),
            },
            {
                id: "emissive",
                type: "color",
                defaultValue: Black(),
            },
        ];
    }
}

export class PhongMaterialType extends MaterialVirtualNodeType<MeshPhongMaterial, [color: Color, emissive: Color, specular: Color, shininess: number, mat: MaterialGenericData]> {
    getId(): string {
        return "PhongMaterial";
    }
    getDescription(): string {
        return "Render an object with a very basic light model and specular reflection";
    }
    create(color: Color, emissive: Color, specular: Color, shininess: number, mat: MaterialGenericData): MeshPhongMaterial {
        return new MeshPhongMaterial({ color: toThreeColor(color), emissive: toThreeColor(emissive), specular: toThreeColor(specular), shininess, ...toThreeSetting(mat) });
    }
    remove(element: MeshPhongMaterial): void {
        element.dispose();
    }
    update(element: MeshPhongMaterial, color: Color, emissive: Color, specular: Color, shininess: number, mat: MaterialGenericData): void {
        element.color.set(toThreeColor(color));
        element.emissive.set(toThreeColor(emissive));
        element.specular.set(toThreeColor(specular));
        element.shininess = shininess;
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [
            {
                id: "color",
                type: "color",
                defaultValue: White(),
            },
            {
                id: "emissive",
                type: "color",
                defaultValue: Black(),
            },
            {
                id: "specular",
                type: "color",
                defaultValue: White(),
            },
            Port.number("shininess", 30),
        ];
    }
}

export class FlatTextureMaterialType extends MaterialVirtualNodeType<MeshBasicMaterial, [color: Color, texture: ImageData, mat: MaterialGenericData]> {
    getId(): string {
        return "FlatTextureMaterial";
    }
    getDescription(): string {
        return "Render an object with solid color, ignoring light";
    }
    create(color: Color, texture: ImageData, mat: MaterialGenericData): MeshBasicMaterial {
        return new MeshBasicMaterial({ color: toThreeColor(color), map: texture?.getThreeJs(), ...toThreeSetting(mat) });
    }
    remove(element: MeshBasicMaterial): void {
        element.dispose();
    }
    update(element: MeshBasicMaterial, color: Color, texture: ImageData, mat: MaterialGenericData): void {
        element.color.set(toThreeColor(color));
        const oldMap = element.map;
        element.map = texture?.getThreeJs();
        element.wireframeLinewidth = 5;
        if (element.map !== oldMap) {
            element.needsUpdate = true;
        }
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [
            {
                id: "color",
                type: "color",
                defaultValue: White(),
            },
            Port.image("texture"),
        ];
    }
}

export class MatcapMaterialType extends MaterialVirtualNodeType<MeshMatcapMaterial, [texture: ImageData, mat: MaterialGenericData]> {
    getId(): string {
        return "MatcapMaterial";
    }
    getDescription(): string {
        return "Render an material using a Matcap texture";
    }
    create(texture: ImageData, mat: MaterialGenericData): MeshMatcapMaterial {
        return new MeshMatcapMaterial({ matcap: texture?.getThreeJs(), ...toThreeSetting(mat) });
    }
    remove(element: MeshMatcapMaterial): void {
        element.dispose();
    }
    update(element: MeshMatcapMaterial, texture: ImageData, mat: MaterialGenericData): void {
        const oldMap = element.matcap;
        element.matcap = texture?.getThreeJs();
        if (element.matcap !== oldMap) {
            element.needsUpdate = true;
        }
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [Port.image("texture")];
    }
}

export class StandardMaterialType extends MaterialVirtualNodeType<MeshStandardMaterial, [color: Color, roughness: number, metalness: number, mat: MaterialGenericData]> {
    getId(): string {
        return "StandardMaterial";
    }
    getDescription(): string {
        return "Render an object with physicaly based shader";
    }
    create(color: Color, roughness: number, metalness: number, mat: MaterialGenericData): MeshStandardMaterial {
        return new MeshStandardMaterial({ color: toThreeColor(color), roughness, metalness, ...toThreeSetting(mat) });
    }
    remove(element: MeshStandardMaterial): void {
        element.dispose();
    }
    update(element: MeshStandardMaterial, color: Color, roughness: number, metalness: number, mat: MaterialGenericData): void {
        element.color.set(toThreeColor(color));
        element.roughness = roughness;
        element.metalness = metalness;
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [
            {
                id: "color",
                type: "color",
                defaultValue: White(),
            },
            {
                id: "roughness",
                type: "number",
                defaultValue: 0.5,
            },
            {
                id: "metalness",
                type: "number",
                defaultValue: 0.5,
            },
        ];
    }
}

export class StandardTextureMaterialType extends MaterialVirtualNodeType<MeshStandardMaterial, [color: Color, colorTexture: ImageData, roughness: number, roughnessTexture: ImageData, metalness: number, metalnessTexture: ImageData, normalTexture: ImageData, mat: MaterialGenericData]> {
    getId(): string {
        return "StandardTextureMaterial";
    }
    getDescription(): string {
        return "Render an object with physicaly based shader";
    }
    create(color: Color, colorTexture: ImageData, roughness: number, roughnessTexture: ImageData, metalness: number, metalnessTexture: ImageData, normalTexture: ImageData, mat: MaterialGenericData): MeshStandardMaterial {
        return new MeshStandardMaterial({
            color: toThreeColor(color),
            roughness,
            metalness,
            map: colorTexture?.getThreeJs(),
            roughnessMap: roughnessTexture?.getThreeJs(),
            metalnessMap: metalnessTexture?.getThreeJs(),
            normalMap: normalTexture?.getThreeJs(),
            ...toThreeSetting(mat),
        });
    }
    remove(element: MeshStandardMaterial): void {
        element.dispose();
    }
    update(element: MeshStandardMaterial, color: Color, colorTexture: ImageData, roughness: number, roughnessTexture: ImageData, metalness: number, metalnessTexture: ImageData, normalTexture: ImageData, mat: MaterialGenericData): void {
        element.color.set(toThreeColor(color));
        element.roughness = roughness;
        element.metalness = metalness;
        setMaterial(element, "map", colorTexture?.getThreeJs());
        setMaterial(element, "roughnessMap", roughnessTexture?.getThreeJs());
        setMaterial(element, "metalnessMap", metalnessTexture?.getThreeJs());
        setMaterial(element, "normalMap", normalTexture?.getThreeJs());

        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [
            {
                id: "color",
                type: "color",
                defaultValue: White(),
            },
            Port.image("colorTexture"),
            Port.number("roughness", 0.5),
            Port.image("roughnessTexture"),
            Port.number("metalness", 0.5),
            Port.image("metalnessTexture"),
            Port.image("normalTexture"),
        ];
    }
}

export class NormalMaterialVirtualNodeType extends MaterialVirtualNodeType<MeshNormalMaterial, [mat: MaterialGenericData]> {
    getId(): string {
        return "NormalMaterial";
    }
    getDescription(): string {
        return "Render an object to display their normal vector";
    }
    create(mat: MaterialGenericData): MeshNormalMaterial {
        return new MeshNormalMaterial({ ...toThreeSetting(mat) });
    }
    remove(element: MeshNormalMaterial): void {
        element.dispose();
    }
    update(element: MeshNormalMaterial, mat: MaterialGenericData): void {
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [];
    }
}

export class DepthMaterialVirtualNodeType extends MaterialVirtualNodeType<MeshDepthMaterial, [mat: MaterialGenericData]> {
    getId(): string {
        return "DepthMaterial";
    }
    getDescription(): string {
        return "Render an object to display their depth relative to the camera";
    }
    create(mat: MaterialGenericData): MeshDepthMaterial {
        return new MeshDepthMaterial({ depthPacking: RGBDepthPacking, ...toThreeSetting(mat) });
    }
    remove(element: MeshDepthMaterial): void {
        element.dispose();
    }
    update(element: MeshDepthMaterial, mat: MaterialGenericData): void {
        updateTreeMaterial(element, mat);
    }
    getInputs(): PortDefinition[] {
        return [];
    }
}

export const MaterialsVirtualNodes = {
    FlatMaterialType: new FlatMaterialType(),
    FlatTextureMaterialType: new FlatTextureMaterialType(),
    StandardMaterialType: new StandardMaterialType(),
    StandardTextureMaterialType: new StandardTextureMaterialType(),
    NormalMaterialVirtualNodeType: new NormalMaterialVirtualNodeType(),
    DepthMaterialVirtualNodeType: new DepthMaterialVirtualNodeType(),
    MatcapMaterialType: new MatcapMaterialType(),
    LambertMaterialType: new LambertMaterialType(),
    PhongMaterialType: new PhongMaterialType(),
};

function setMaterial<T extends Material>(mat: T, props: keyof T, value: Texture | null) {
    var old = mat[props];
    if (old !== value) {
        mat[props] = value as any;
        mat.needsUpdate = true;
    }
}
