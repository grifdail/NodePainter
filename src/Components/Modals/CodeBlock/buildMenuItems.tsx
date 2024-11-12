import { MenuItem, SubMenu } from "@szhsin/react-menu";
import { CodeBlockGenerator } from "../../../Types/CodeBlock";

type MenuTree = {
  [k: string]: { isGroup: true; values: MenuTree; name: string } | { isGroup: false; name: string; value: CodeBlockGenerator };
};

export function buildMenuItems<T extends CodeBlockGenerator>(CodeBlockStatementTypes: { [k: string]: T }, addStatement: (type: string) => void, filter?: (gen: T) => boolean) {
  var build: MenuTree = {};

  function addToPath(path: string[], target: MenuTree, value: any) {
    if (path.length <= 1) {
      target[path[0]] = { isGroup: false, name: path[0], value: value };
      return;
    }
    var firstPath = path[0];
    let firstTarget = target[firstPath];
    if (!firstTarget || !firstTarget.isGroup) {
      firstTarget = { isGroup: true, values: {}, name: path[0] };
      target[firstPath] = firstTarget;
    }
    addToPath(path.slice(1), firstTarget.values, value);
  }

  Object.values(CodeBlockStatementTypes).forEach((gen) => {
    if (filter && !filter(gen)) {
      return;
    }
    var path = gen.id.split("/");
    addToPath(path, build, gen);
  });

  function drawSubGroup(obj: MenuTree) {
    return <>{Object.values(obj).map((info) => (info.isGroup ? <SubMenu label={info.name}>{drawSubGroup(info.values)}</SubMenu> : <MenuItem onClick={() => addStatement(info.value.id)}>{info.name}</MenuItem>))}</>;
  }
  return drawSubGroup(build);
}
