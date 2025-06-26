import { ShaderMaterial } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { MaterialGenericData } from "./MaterialGenericData";
import { MaterialVirtualNodeType } from "./MaterialVirtualNodeType";
import { toThreeSetting, updateTreeMaterial } from "./MaterialsVirtualNodes";

export class ShaderMaterialType extends MaterialVirtualNodeType<ShaderMaterial, [fragmentShader: string, vertexShader: string, uniforms: any, mat: MaterialGenericData]> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getId(): string {
    return "ShaderMaterial";
  }
  getDescription(): string {
    return "Render an object with solid color, ignoring light";
  }
  create(fragmentShader: string, vertexShader: string, uniforms: any, mat: MaterialGenericData): ShaderMaterial {
    return new ShaderMaterial({ fragmentShader, vertexShader, uniforms: uniforms, ...toThreeSetting(mat) });
  }
  remove(element: ShaderMaterial): void {
    element.dispose();
  }
  update(element: ShaderMaterial, fragmentShader: string, vertexShader: string, uniforms: any, mat: MaterialGenericData): void {
    Object.entries(uniforms).forEach(([id, obj]) => {
      element.uniforms[id].value = (obj as any).value;
    });
    updateTreeMaterial(element, mat);
  }
}
