import { StatefullVirtualElement } from "./StatefullVirtualElement";
import { VirtualNodeTypes } from "./VirtualNodeTypes";

export abstract class StatefullElementType<TSave, TProps extends any[]> {
  constructor() {}
  id: VirtualNodeTypes | null = null;
  abstract create(...props: TProps): TSave;
  abstract remove(element: TSave): void;
  abstract update(element: TSave, ...props: TProps): void;

  mountChildren(element: TSave, child: any) {}
  unmountChildren(element: TSave, child: any) {}
  generate(key: string, children: StatefullVirtualElement<any, any>[], ...props: TProps): StatefullVirtualElement<TSave, TProps> {
    return {
      type: this.id as VirtualNodeTypes,
      props,
      key,
      children: Object.fromEntries(children.filter((item) => item).map((child) => [child.key, child])),
    };
  }
}
