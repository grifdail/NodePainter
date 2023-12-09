import { GridUi } from "./GridUi";
import { NodeCreationModal } from "./Modals/NodeCreationModal";
import { useRouter } from "../Hooks/useRouter";
import { SaveModal } from "./Modals/SaveModal";
import { LoadModal } from "./Modals/LoadModal";
import { ExportGifModal } from "./Modals/ExportGifModal";
import { CustomNodeModal } from "./Modals/CustomNodeModal";

export function Router() {
  const close = useRouter((state) => state.close);
  const route = useRouter((state) => state.current);
  return (
    <div>
      {route === "default" && <GridUi />}
      {route === "node-creation" && <NodeCreationModal close={close} />}
      {route === "save" && <SaveModal close={close} />}
      {route === "load" && <LoadModal close={close} />}
      {route === "export-gif" && <ExportGifModal close={close} />}
      {route === "custom-function" && <CustomNodeModal close={close} />}
    </div>
  );
}
