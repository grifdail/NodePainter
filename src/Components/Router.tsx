import { GridUi } from "./GridUi";
import { NodeCreationModal } from "./NodeCreationModal";
import { useRouter } from "../Hooks/useRouter";
import { SaveModal } from "./SaveModal";
import { LoadModal } from "./LoadModal";
import { ExportGifModal } from "./ExportGifModal";
import { CustomNodeModal } from "./CustomNodeModal";

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
