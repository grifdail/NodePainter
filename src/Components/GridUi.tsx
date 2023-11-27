import { IconCodePlus } from "@tabler/icons-react";
import React from "react";

export function GridUi({ visible, openAddModal }: { visible: boolean; openAddModal: () => void }) {
  if (!visible) {
    return null;
  }
  return (
    <div className="full-screen-layout">
      <button className="add-button" onClick={openAddModal}>
        <IconCodePlus></IconCodePlus>
      </button>
    </div>
  );
}
