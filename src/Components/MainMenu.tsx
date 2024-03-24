import { IconMenu2 } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { useRouter } from "../Hooks/useRouter";
import { resetCamera } from "../Utils/resetCamera";
import { Templates } from "../Data/templates";

export function MainMenu() {
  const openModal = useRouter((state) => state.open);
  const reset = useTree((state) => state.reset);
  const loadTemplate = useTree((state) => state.loadTemplate);

  return (
    <Menu
      portal
      menuButton={
        <button>
          <IconMenu2></IconMenu2>
        </button>
      }>
      <MenuItem onClick={() => openModal("about")}>About</MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem onClick={reset}>New Graph</MenuItem>
      <MenuItem onClick={() => openModal("save")}>Save</MenuItem>
      <MenuItem onClick={() => openModal("load")}>Load</MenuItem>
      <MenuDivider></MenuDivider>
      {Object.entries(Templates).map(([key, value]) => (
        <MenuItem onClick={() => loadTemplate(value)}>New from template {key}</MenuItem>
      ))}
      <MenuDivider></MenuDivider>
      <MenuItem onClick={() => openModal("export-gif")}>Export gif</MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem onClick={resetCamera}>Reset camera</MenuItem>
    </Menu>
  );
}
