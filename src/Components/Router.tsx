import { GridUi } from "./GridUi";
import { NodeSelectionModal } from "./Modals/NodeSelectionModal";
import { useRouter } from "../Hooks/useRouter";
import { SaveModal } from "./Modals/SaveModal";
import { LoadModal } from "./Modals/LoadModal";
import { ExportGifModal } from "./Modals/ExportGifModal";
import { CustomNodeModal } from "./Modals/CustomNodeModal";
import { CustomShaderModal } from "./Modals/CustomShaderModal";
import { CustomSimulationModal } from "./Modals/CustomSimulationModal";
import { SettingsModal } from "./Modals/SettingsModal";
import { AboutModal } from "./Modals/AboutModal";
import { PaintModal } from "./Modals/PaintModal";

export function Router() {
  const close = useRouter((state) => state.close);
  const route = useRouter((state) => state.current);
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
    </div>
  );
}
