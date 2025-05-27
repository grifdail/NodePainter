import { MenuItem, SubMenu } from "@szhsin/react-menu";
import { PathNode } from "../Data/PathNode";

export function TreeMenu<T>({ tree, callback }: { tree: PathNode<T>; callback: (value: T) => void }) {
  return (
    <>
      {Object.entries(tree.children).map(([key, node]) => {
        const value = node.value;
        if (value !== null) {
          return (
            <MenuItem
              onClick={() => callback(value)}
              key={key}>
              {key}
            </MenuItem>
          );
        } else {
          return (
            <SubMenu label={key}>
              <TreeMenu
                tree={node}
                callback={callback}></TreeMenu>
            </SubMenu>
          );
        }
      })}
    </>
  );
}
