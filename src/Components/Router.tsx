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
import { DialogModal } from "./Modals/DialogModal";
import { Routes } from "../Types/Routes";
import { CodeBlockModal } from "./Modals/CodeBlockModal";
import { MainMenu } from "./MainMenu";
import { IntroMenuModal } from "./Modals/IntroMenuModal";

export function Router() {
  const close = useRouter((state) => state.close);
  const route = useRouter((state) => state.current);
  const dialog = useDialog();
  return (
    <div>
      {route === Routes.Default && <GridUi />}
      {route === Routes.NodeCreation && <NodeSelectionModal close={close} />}
      {route === Routes.Save && <SaveModal close={close} />}
      {route === Routes.Load && <LoadModal close={close} />}
      {route === Routes.ExportGif && <ExportGifModal close={close} />}
      {route === Routes.CustomFunction && <CustomNodeModal close={close} />}
      {route === Routes.CustomShader && <CustomShaderModal close={close} />}
      {route === Routes.CustomSimulation && <CustomSimulationModal close={close} />}
      {route === Routes.Settings && <SettingsModal close={close} />}
      {route === Routes.About && <AboutModal close={close} />}
      {route === Routes.Paint && <PaintModal />}
      {route === Routes.CodeBlock && <CodeBlockModal />}
      {route === Routes.IntroMenu && <IntroMenuModal close={close} />}
      {dialog.dialogs.map((d) => (
        <DialogModal
          key={d.id}
          dialog={d}
          controler={dialog}></DialogModal>
      ))}
    </div>
  );
}
