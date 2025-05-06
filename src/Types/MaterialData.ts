import { Material } from "three";
import { StatefullVirtualElement } from "../Utils/statefullContext";

export type MaterialDataAny<TProps extends any[]> = StatefullVirtualElement<Material, TProps>;
export type MaterialData = MaterialDataAny<any[]>;
