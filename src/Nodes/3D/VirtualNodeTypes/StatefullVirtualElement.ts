import { VirtualNodeTypes } from "./VirtualNodeTypes";

export type StatefullVirtualElement<TSave, TProps extends any[]> = {
  type: VirtualNodeTypes;
  props: TProps;
  key: string;
  children: { [key: string]: StatefullVirtualElement<any, any> };
};
