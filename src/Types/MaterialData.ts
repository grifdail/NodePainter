import { BufferGeometry, Material } from "three";
import { StatefullVirtualElement } from "../Nodes/3D/VirtualNodeTypes/StatefullVirtualElement";

export type MaterialDataAny<TProps extends any[]> = StatefullVirtualElement<Material, TProps>;
export type MaterialData = MaterialDataAny<any[]>;
export type MeshData = StatefullVirtualElement<BufferGeometry, any[]>;
