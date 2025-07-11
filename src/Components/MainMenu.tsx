import { IconDeviceDesktopDown, IconDeviceFloppy, IconFile, IconFocusCentered, IconFolderOpen, IconGif, IconInfoCircle, IconMenu2, IconPng, IconSettings, IconTrashX } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useRouter } from "../Hooks/useRouter";
import { resetCamera } from "../Utils/ui/resetCamera";
import { Templates } from "../Data/templates";
import { saveSketchWithNamePrompt, Sketch, useAllSavedSketch } from "../Hooks/db";
import { Routes } from "../Types/Routes";
import { useCallback } from "react";
import { useDialog } from "../Hooks/useDialog";
import { SketchTemplate } from "../Types/SketchTemplate";
import { listOrphanNode } from "../Utils/graph/modification/listOrphanNode";

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
      <MenuItem onClick={() => openModal(Routes.SketchMenu)}>
        <IconFolderOpen /> Sketches
      </MenuItem>
      <SubMenu
        label={
          <>
            <IconDeviceFloppy></IconDeviceFloppy>Save
          </>
        }>
        <MenuItem onClick={() => openModal(Routes.Save)}>
          <IconDeviceDesktopDown /> Save to JSON
        </MenuItem>
        <MenuItem onClick={() => saveSketchWithNamePrompt(saveSketch)}>
          <IconDeviceFloppy /> Save to browser
        </MenuItem>
      </SubMenu>

      <MenuDivider></MenuDivider>
      <MenuItem onClick={() => openModal(Routes.ExportGif)}>
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
