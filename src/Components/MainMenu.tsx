import { IconDeviceDesktopDown, IconDeviceFloppy, IconFile, IconFocusCentered, IconFolderOpen, IconGif, IconInfoCircle, IconMenu2, IconPng, IconSettings } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useRouter } from "../Hooks/useRouter";
import { resetCamera } from "../Utils/resetCamera";
import { Templates } from "../Data/templates";
import { Sketch, useAllSavedSketch } from "../Hooks/db";
import { Routes } from "../Types/Routes";
import { useCallback } from "react";
import { useDialog } from "../Hooks/useDialog";
import { SketchTemplate } from "../Types/SketchTemplate";

function download(url: string, filename: string = "data.json") {
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
}

export function MainMenu({ showPreview }: { showPreview: boolean }) {
  const openModal = useRouter((state) => state.open);
  const [_, saveSketch] = useAllSavedSketch();

  function loadSketch(sketch: Sketch): void {
    var template: SketchTemplate = JSON.parse(sketch.content);
    useTree.getState().loadTemplate(template);
  }

  const saveCurrentSketch = useCallback(
    function saveCurrentSketch() {
      var tree = useTree.getState();
      const name = tree.getSketchName();
      const content = tree.exportTemplate();
      saveSketch(name, content);
    },
    [saveSketch]
  );

  const exportPng = useCallback(() => {
    const canvas = document.querySelector("#SketchPreview canvas.p5Canvas") as HTMLCanvasElement;
    const name = useTree.getState().getSketchName();
    const filename = `${name}-np-${Date.now()}`;
    const filenameWithExt = `${filename}.png`;

    const data = canvas.toDataURL("image/png");

    download(data, filenameWithExt);
  }, []);

  return (
    <Menu
      portal
      menuButton={
        <button
          data-tooltip-id="tooltip"
          data-tooltip-content="Menu">
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
      <MenuItem onClick={() => openModal(Routes.IntroMenu)}>
        <IconFolderOpen /> New or Open
      </MenuItem>
      <MenuItem onClick={() => openModal(Routes.Save)}>
        <IconDeviceDesktopDown /> Save to JSON
      </MenuItem>
      <MenuItem onClick={() => saveCurrentSketch()}>
        <IconDeviceFloppy /> Save to browser
      </MenuItem>

      <MenuDivider></MenuDivider>
      <MenuItem onClick={() => openModal(Routes.ExportGif)}>
        <IconGif></IconGif> Export
      </MenuItem>
      <MenuItem
        onClick={() => exportPng()}
        disabled={!showPreview}>
        <IconPng></IconPng> Export frame
      </MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem onClick={resetCamera}>
        <IconFocusCentered></IconFocusCentered> Reset camera
      </MenuItem>
    </Menu>
  );
}
