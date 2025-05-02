export type StatefullContextType<TProps extends any[], TSave> = {
  add(parent: any, ...props: TProps): TSave;
  remove(element: TSave): void;
  update(element: TSave, ...props: TProps): void;
};

export class StatefullVirtualElement<TSave, TProps extends any[]> {
  type: StatefullContextType<TProps, TSave>;
  props: TProps;
  key: string;
  children: { [key: string]: StatefullVirtualElement<any, any> } = {};

  constructor(key: string, props: TProps, type: StatefullContextType<TProps, TSave>) {
    (this.key = key), (this.props = props);
    this.type = type;
  }
}

export class StatefullSave<TSave, TProps extends any[]> {
  save: TSave;
  data: StatefullVirtualElement<TSave, TProps>;
  children: { [key: string]: StatefullSave<any, any> } = {};

  constructor(virtual: StatefullVirtualElement<TSave, TProps>, parent: any) {
    this.data = virtual;
    this.save = virtual.type.add(parent, ...virtual.props);
  }

  update(virtual: StatefullVirtualElement<TSave, TProps>) {
    reconciliateChildren(this, virtual);
    this.data.props = virtual.props;

    this.data.type.update(this.save, ...virtual.props);
  }

  remove() {
    Object.keys(this.children).forEach((key) => {
      this.children[key].remove();
      delete this.children[key];
    });
    this.data.type.remove(this.save);
  }
}

function reconciliateChildren<TSave, TProps extends any[]>(previous: StatefullSave<TSave, TProps>, next: StatefullVirtualElement<TSave, TProps>) {
  var keyPrevious = Object.keys(previous.children);
  var keyNext = Object.keys(next.children);
  var toBeDeleted = keyPrevious.filter((key) => next.children[key] === undefined);
  var toBeAdded = keyNext.filter((key) => previous.children[key] === undefined);

  toBeDeleted.forEach((key) => {
    previous.children[key].remove();
    delete previous.children[key];
  });
  toBeAdded.forEach((key) => {
    var newChild = new StatefullSave(next.children[key], previous.save);
    previous.children[key] = newChild;
  });
  keyNext.forEach((key) => {
    previous.children[key].update(next.children[key]);
  });
}
