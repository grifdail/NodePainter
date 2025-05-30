import { VirtualNodes } from "../Nodes/3D/VirtualNodeTypes/VirtualNodeTypes";
import { StatefullElementType } from "./statefullContext";
import { StatefullVirtualElement } from "./StatefullVirtualElement";

export class StatefullInstance<TSave, TProps extends any[]> {
  instance: TSave;
  virtual: StatefullVirtualElement<TSave, TProps>;
  type: StatefullElementType<TSave, TProps>;
  childrenInstances: { [key: string]: StatefullInstance<any, any> } = {};

  constructor(virtual: StatefullVirtualElement<TSave, TProps>) {
    this.type = VirtualNodes[virtual.type] as any as StatefullElementType<TSave, TProps>;
    this.virtual = virtual;
    this.instance = this.type.create(...virtual.props);
  }

  update(virtual: StatefullVirtualElement<TSave, TProps>, root: any) {
    this.reconciliateChildren(this, virtual, parent);
    this.virtual = virtual;

    this.type.update(this.instance, ...virtual.props);
  }

  remove() {
    Object.keys(this.childrenInstances).forEach((key) => {
      if (this.type.unmountChildren) {
        this.type.unmountChildren(this.instance, this.childrenInstances[key].instance);
      }
      this.childrenInstances[key].remove();
      delete this.childrenInstances[key];
    });

    this.type.remove(this.instance);
  }
  reconciliateChildren<TSave, TProps extends any[]>(instance: StatefullInstance<TSave, TProps>, virtual: StatefullVirtualElement<TSave, TProps>, parent: any) {
    var keyPrevious = Object.keys(instance.childrenInstances);
    var keyNext = Object.keys(virtual.children);
    var toBeDeleted = keyPrevious.filter((key) => virtual.children[key] === undefined);
    var toBeAdded = keyNext.filter((key) => instance.childrenInstances[key] === undefined);
    toBeDeleted.forEach((key) => {
      if (instance.type.unmountChildren) {
        instance.type.unmountChildren(instance.instance, instance.childrenInstances[key].instance);
      }
      instance.childrenInstances[key].remove();
      delete instance.childrenInstances[key];
    });
    toBeAdded.forEach((key) => {
      var newChild = new StatefullInstance(virtual.children[key]);
      if (instance.type.mountChildren) {
        instance.type.mountChildren(instance.instance, newChild.instance);
      }
      instance.childrenInstances[key] = newChild;
    });
    keyNext.forEach((key) => {
      instance.childrenInstances[key].update(virtual.children[key], instance.instance);
    });
  }
}
