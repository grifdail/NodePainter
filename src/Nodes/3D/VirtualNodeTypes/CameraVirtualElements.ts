import { Icon, IconVideo } from "@tabler/icons-react";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { Quaternion, Vector3 } from "../../../Types/vectorDataType";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

type PerspectiveProps = [position: Vector3, rotation: Quaternion, fov: number, aspectRatio: number];
export class PerspectiveCameraVirtualNodeType extends SimpleNodeVirtualNodeType<PerspectiveCamera, PerspectiveProps> {
  getInputs(): PortDefinition[] {
    return [Port.vector3("position", [0, 0, 10]), Port.quaternion("rotation"), Port.number("fov", 60), Port.number("aspectRatio", 1)];
  }
  getId(): string {
    return "PerspectiveCamera";
  }
  getDescription(): string {
    return "A 3d camera that display object in the distance smaller";
  }
  getOutput(): PortDefinition {
    return Port.object3d("out");
  }
  create(position: Vector3, rotation: Quaternion, fov: number, aspectRatio: number): PerspectiveCamera {
    const self = new PerspectiveCamera(fov, aspectRatio);
    return self;
  }

  update(element: PerspectiveCamera, position: Vector3, rotation: Quaternion, fov: number, aspectRatio: number): void {
    element.position.set(...position);
    element.quaternion.set(...rotation);
    element.fov = fov;
    element.aspect = aspectRatio;
  }
  remove(element: PerspectiveCamera): void {}
  getIcon(): Icon {
    return IconVideo;
  }
}

type OrthographicProps = [position: Vector3, rotation: Quaternion, width: number, height: number];
export class OrthographicCameraVirtualNodeType extends SimpleNodeVirtualNodeType<OrthographicCamera, OrthographicProps> {
  getInputs(): PortDefinition[] {
    return [Port.vector3("position"), Port.quaternion("rotation"), Port.number("width", 6), Port.number("height", 6)];
  }
  getId(): string {
    return "OrthographicCamera";
  }
  getDescription(): string {
    return "A 3d camera that display keep everything the same size";
  }
  getOutput(): PortDefinition {
    return Port.object3d("out");
  }
  create(position: Vector3, rotation: Quaternion, width: number, height: number): OrthographicCamera {
    const self = new OrthographicCamera(-width * 0.5, width * 0.5, -height * 0.5, height * 0.5);
    return self;
  }

  update(element: OrthographicCamera, position: Vector3, rotation: Quaternion, width: number, height: number): void {
    element.position.set(...position);
    element.quaternion.set(...rotation);
    element.left = -width * 0.5;
    element.right = width * 0.5;
    element.top = -height * 0.5;
    element.bottom = height * 0.5;
  }
  remove(element: OrthographicCamera): void {}
  getIcon(): Icon {
    return IconVideo;
  }
}

export const CameraVirtualElements = {
  PerspectiveCameraVirtualNodeType: new PerspectiveCameraVirtualNodeType(),
  OrthographicCameraVirtualNodeType: new OrthographicCameraVirtualNodeType(),
};
