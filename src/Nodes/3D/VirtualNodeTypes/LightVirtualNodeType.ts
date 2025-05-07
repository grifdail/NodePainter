import { AmbientLight, DirectionalLight, PointLight } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Color, createVector3, Vector3 } from "../../../Types/vectorDataType";
import { toThreeColor, White } from "../../../Utils/colorUtils";
import { Object3DVirtualNodeType } from "./SimpleNodeVirtualNodeType";

export class AmbientLightVirtualNodeType extends Object3DVirtualNodeType<AmbientLight, [color: Color, intensity: number]> {
  getInputs(): PortDefinition[] {
    return [
      { id: "color", type: "color", defaultValue: White() },
      { id: "intensity", type: "number", defaultValue: 0.3 },
    ];
  }
  getId(): string {
    return "AmbientLight";
  }
  getDescription(): string {
    return "Light the whole scene uniformely, from all direction";
  }
  create(color: Color, intensity: number): AmbientLight {
    const self = new AmbientLight(toThreeColor(color), intensity);
    return self;
  }
  update(element: AmbientLight, color: Color, intensity: number): void {
    element.color.set(toThreeColor(color));
    element.intensity = intensity;
  }
  remove(element: AmbientLight): void {}
}

export class DirectionalLightVirtualNodeType extends Object3DVirtualNodeType<DirectionalLight, [color: Color, intensity: number, direction: Vector3]> {
  getInputs(): PortDefinition[] {
    return [
      { id: "color", type: "color", defaultValue: White() },
      { id: "intensity", type: "number", defaultValue: 0.3 },
      { id: "direction", type: "vector3", defaultValue: createVector3(0, 1, 0) },
    ];
  }
  getId(): string {
    return "DirectionalLight";
  }
  getDescription(): string {
    return "A light that iluminate everything from a single direction like the sun";
  }
  create(color: Color, intensity: number, direction: Vector3): DirectionalLight {
    const self = new DirectionalLight(toThreeColor(color), intensity);
    return self;
  }
  update(element: DirectionalLight, color: Color, intensity: number, direction: Vector3): void {
    element.color.set(toThreeColor(color));
    element.intensity = intensity;
    element.position.set(-direction[0], -direction[1], -direction[2]);
  }
  remove(element: DirectionalLight): void {}
}

export class PointLightVirtualNodeType extends Object3DVirtualNodeType<PointLight, [color: Color, intensity: number, position: Vector3, distance: number, decay: number]> {
  getInputs(): PortDefinition[] {
    return [
      { id: "color", type: "color", defaultValue: White() },
      { id: "intensity", type: "number", defaultValue: 0.3 },
      { id: "position", type: "vector3", defaultValue: createVector3(0, 0, 0) },
      { id: "distance", type: "number", defaultValue: 0 },
      { id: "decay", type: "number", defaultValue: 2 },
    ];
  }
  getId(): string {
    return "PointLight";
  }
  getDescription(): string {
    return "A light emiting in all direction from a source";
  }
  create(color: Color, intensity: number, position: Vector3, distance: number, decay: number) {
    const self = new PointLight(toThreeColor(color), intensity);
    return self;
  }
  update(element: PointLight, color: Color, intensity: number, position: Vector3, distance: number, decay: number): void {
    element.color.set(toThreeColor(color));
    element.intensity = intensity;
    element.position.set(...position);
    element.distance = distance;
    element.decay = decay;
  }
  remove(element: PointLight): void {}
}

export const LightVirtualNodeTypes = {
  PointLightVirtualNodeType: new PointLightVirtualNodeType(),
  DirectionalLightVirtualNodeType: new DirectionalLightVirtualNodeType(),
  AmbientLightVirtualNodeType: new AmbientLightVirtualNodeType(),
};
