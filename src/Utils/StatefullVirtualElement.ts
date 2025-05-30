import { VirtualNodeTypes } from "../Nodes/3D/VirtualNodeTypes/VirtualNodeTypes";

export type StatefullVirtualElement<TSave, TProps extends any[]> = {
  type: VirtualNodeTypes;
  props: TProps;
  key: string;
  children: { [key: string]: StatefullVirtualElement<any, any> };
};
