import { VirtualNodeTypes } from "./VirtualNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type StatefullVirtualElement<TSave, TProps extends any[]> = {
    type: VirtualNodeTypes;
    props: TProps;
    key: string;
    children: { [key: string]: StatefullVirtualElement<any, any> };
};
