import { IconCodePlus, IconPlayerPlayFilled, IconPlayerStopFilled } from "@tabler/icons-react";
import React from "react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";

export function GridUi({ visible, openAddModal }: { visible: boolean; openAddModal: () => void }) {
  const [showPreview, togglePreview] = useToggle(true);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);

  if (!visible) {
    return null;
  }

  return (
    <div className="full-screen-layout grid-ui">
      {portSelection.hasSelection && (
        <div className={`warning-track ${portSelection.type}`}>
          <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
          <button onClick={portSelection.reset}>cancel</button>
        </div>
      )}
      <menu>
        <button className="button" onClick={openAddModal}>
          <IconCodePlus></IconCodePlus>
        </button>
        <button className="button" onClick={() => togglePreview()}>
          {showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}
        </button>
      </menu>

      {showPreview && <SketchPreview></SketchPreview>}
    </div>
  );
}
