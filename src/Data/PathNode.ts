//buildTree<SketchTemplate>(data);
export type PathNode<T> = { children: { [key: string]: PathNode<T> }; value: T | null };
