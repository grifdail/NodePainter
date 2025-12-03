import { IconDeviceDesktopDown, IconDeviceFloppy, IconFile, IconFocusCentered, IconFolderOpen, IconGif, IconInfoCircle, IconMenu2, IconPng, IconSettings, IconTrashX } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { resetCamera } from "../Utils/ui/resetCamera";
import { Templates } from "../Data/templates";
import { saveSketchWithNamePrompt, Sketch, useAllSavedSketch } from "../Hooks/db";
import { Routes } from "../Types/Routes";
import { useCallback } from "react";
import { useDialog } from "../Hooks/useDialog";
import { SketchSave } from "../Types/SketchTemplate";
import { listOrphanNode } from "../Utils/graph/modification/listOrphanNode";
import { navigate } from "wouter/use-browser-location";
import { openAboutModal, openGifExportModal, openSaveModal, openSettingModal, openSketchMenu } from "../Actions/navigationAction";

function download(url: string, filename: string = "data.json") {
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
}

export function MainMenu({ showPreview }: { showPreview: boolean }) {
  const [_, saveSketch] = useAllSavedSketch();

  function loadSketch(sketch: Sketch): void {
    var template: SketchSave = JSON.parse(sketch.content);
    useTree.getState().loadTemplate(template);
  }

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
      <MenuItem onClick={openAboutModal}>
        <IconInfoCircle />
        About
      </MenuItem>
      <MenuItem onClick={openSettingModal}>
        <IconSettings /> Settings
      </MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem onClick={openSketchMenu}>
        <IconFolderOpen /> Sketches
      </MenuItem>
      <SubMenu
        label={
          <>
            <IconDeviceFloppy></IconDeviceFloppy>Save
          </>
        }>
        <MenuItem onClick={openSaveModal}>
          <IconDeviceDesktopDown /> Save to JSON
        </MenuItem>
        <MenuItem onClick={() => saveSketchWithNamePrompt(saveSketch)}>
          <IconDeviceFloppy /> Save to browser
        </MenuItem>
      </SubMenu>

      <MenuDivider></MenuDivider>
      <MenuItem onClick={openGifExportModal}>
        <IconGif></IconGif> Export
      </MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem
        onClick={() => {
          var tree = useTree.getState();
          var orphan = listOrphanNode(tree.nodes);
          if (orphan.length > 0) {
            useDialog.getState().openConfirm(
              (result) => {
                if (result) {
                  tree.deleteNodes(orphan);
                }
              },
              "Delete orphan",
              `Are you sure you want to delete all orphan node ? This will delete ${orphan.length} nodes and cannot be undone.`
            );
          }
        }}>
        <IconTrashX /> Remove all orphan nodes
      </MenuItem>
      <MenuItem onClick={resetCamera}>
        <IconFocusCentered></IconFocusCentered> Reset camera
      </MenuItem>
    </Menu>
  );
}
