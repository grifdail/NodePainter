import { GridUi } from "./GridUi";
import { NodeSelectionModal } from "./Modals/NodeSelectionModal";
import { useRouter } from "../Hooks/useRouter";
import { SaveModal } from "./Modals/SaveModal";
import { LoadModal } from "./Modals/LoadModal";
import { ExportGifModal } from "./Modals/ExportGifModal";
import { CustomNodeModal } from "./Modals/CustomNodes/CustomFunctionModal";
import { CustomShaderModal } from "./Modals/CustomNodes/CustomShaderModal";
import { CustomSimulationModal } from "./Modals/CustomNodes/CustomSimulationModal";
import { SettingsModal } from "./Modals/SettingsModal";
import { AboutModal } from "./Modals/AboutModal";
import { PaintModal } from "./Modals/PaintModal";
import { useDialog } from "../Hooks/useDialog";
import { DialogModal } from "./Modals/DialogModel";

export function Router() {
  const close = useRouter((state) => state.close);
  const route = useRouter((state) => state.current);
  const dialog = useDialog();
  return (
    <div>
      {route === "default" && <GridUi />}
      {route === "node-creation" && <NodeSelectionModal close={close} />}
      {route === "save" && <SaveModal close={close} />}
      {route === "load" && <LoadModal close={close} />}
      {route === "export-gif" && <ExportGifModal close={close} />}
      {route === "custom-function" && <CustomNodeModal close={close} />}
      {route === "custom-shader" && <CustomShaderModal close={close} />}
      {route === "custom-simulation" && <CustomSimulationModal close={close} />}
      {route === "settings" && <SettingsModal close={close} />}
      {route === "about" && <AboutModal close={close} />}
      {route === "paint" && <PaintModal />}
      {dialog.dialogs.map((d) => (
        <DialogModal dialog={d} controler={dialog}></DialogModal>
      ))}
    </div>
  );
}
