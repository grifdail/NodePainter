import { IconDeviceFloppy, IconFile, IconFocusCentered, IconGif, IconInfoCircle, IconMenu2, IconSettings } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useRouter } from "../Hooks/useRouter";
import { resetCamera } from "../Utils/resetCamera";
import { SketchTemplate, Templates } from "../Data/templates";
import { Sketch, useAllSavedSketch } from "../Hooks/db";
import { Routes } from "../Types/Routes";

export function MainMenu() {
  const openModal = useRouter((state) => state.open);
  const reset = useTree((state) => state.reset);
  const loadTemplate = useTree((state) => state.loadTemplate);
  const [sketches, saveSketch] = useAllSavedSketch();

  function loadSketch(sketch: Sketch): void {
    var template: SketchTemplate = JSON.parse(sketch.content);
    useTree.getState().loadTemplate(template);
  }

  function saveCurrentSketch() {
    var tree = useTree.getState();
    const name = tree.getSketchName();
    const content = tree.exportTemplate();
    saveSketch(name, content);
  }

  return (
    <Menu
      portal
      menuButton={
        <button>
          <IconMenu2></IconMenu2>
        </button>
      }>
      <MenuItem onClick={() => openModal(Routes.About)}>
        <IconInfoCircle />
        About
      </MenuItem>
      <MenuItem onClick={() => openModal(Routes.Settings)}>
        <IconSettings /> Settings
      </MenuItem>
      <MenuDivider></MenuDivider>
      <SubMenu
        label={
          <>
            <IconFile></IconFile> New
          </>
        }>
        <MenuItem onClick={reset}>Default</MenuItem>
        {Object.entries(Templates).map(([key, value]) => (
          <MenuItem onClick={() => loadTemplate(value)}>Template {key}</MenuItem>
        ))}
      </SubMenu>

      <SubMenu
        label={
          <>
            <IconDeviceFloppy></IconDeviceFloppy> Save & Load
          </>
        }>
        <MenuItem onClick={() => openModal(Routes.Save)}>Save to JSON</MenuItem>
        <MenuItem onClick={() => saveCurrentSketch()}>Save</MenuItem>
        <MenuDivider></MenuDivider>
        <MenuItem onClick={() => openModal(Routes.Load)}>Load from JSON</MenuItem>
        <MenuDivider></MenuDivider>
        {sketches?.map((sketch) => (
          <MenuItem key={sketch.name} onClick={() => loadSketch(sketch)}>
            {sketch.name}
          </MenuItem>
        ))}
      </SubMenu>

      <MenuDivider></MenuDivider>
      <MenuItem onClick={() => openModal(Routes.ExportGif)}>
        <IconGif></IconGif> Export gif
      </MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem onClick={resetCamera}>
        <IconFocusCentered></IconFocusCentered> Reset camera
      </MenuItem>
    </Menu>
  );
}
