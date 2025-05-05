export type StatefullElementType<TSave, TProps extends any[]> = {
  create(...props: TProps): TSave;
  remove(element: TSave): void;
  update(element: TSave, ...props: TProps): void;
  mountChildren?(element: TSave, child: any): void;
  unmountChildren?(element: TSave, child: any): void;
};

export class StatefullVirtualElement<TSave, TProps extends any[]> {
  type: StatefullElementType<TSave, TProps>;
  props: TProps;
  key: string;
  children: { [key: string]: StatefullVirtualElement<any, any> } = {};

  constructor(key: string, type: StatefullElementType<TSave, TProps>, children: StatefullVirtualElement<any, any>[], ...props: TProps) {
    this.key = key;
    this.props = props;
    this.type = type;
    this.children = Object.fromEntries(children.map((child) => [child.key, child]));
  }
}

export class StatefullInstance<TSave, TProps extends any[]> {
  instance: TSave;
  virtual: StatefullVirtualElement<TSave, TProps>;
  type: StatefullElementType<TSave, TProps>;
  childrenInstances: { [key: string]: StatefullInstance<any, any> } = {};

  constructor(virtual: StatefullVirtualElement<TSave, TProps>) {
    this.virtual = virtual;
    this.instance = virtual.type.create(...virtual.props);
    this.type = virtual.type;
  }

  update(virtual: StatefullVirtualElement<TSave, TProps>, root: any) {
    reconciliateChildren(this, virtual, parent);
    this.virtual.props = virtual.props;

    this.virtual.type.update(this.instance, ...virtual.props);
  }

  remove() {
    Object.keys(this.childrenInstances).forEach((key) => {
      if (this.type.unmountChildren) {
        this.type.unmountChildren(this.instance, this.childrenInstances[key].instance);
      }
      this.childrenInstances[key].remove();
      delete this.childrenInstances[key];
    });

    this.virtual.type.remove(this.instance);
  }
}

function reconciliateChildren<TSave, TProps extends any[]>(instance: StatefullInstance<TSave, TProps>, virtual: StatefullVirtualElement<TSave, TProps>, parent: any) {
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
