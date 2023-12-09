import React from "react";
import { Icon, IconX } from "@tabler/icons-react";
import { FullScreenDiv } from "./StyledComponents/FullScreenDiv";
import { ModalBody } from "./StyledComponents/ModalBody";

export function Modal({ children, title, icon: Icon, onClose, big = false }: { children?: any; title?: string; big?: boolean; icon?: Icon; onClose?: () => void }) {
  return (
    <FullScreenDiv modal>
      <ModalBody big={big}>
        <header>
          {Icon && <Icon />}
          <h2>{title}</h2>
          <button onClick={onClose}>
            <IconX></IconX>
          </button>
        </header>
        <section>{children}</section>
      </ModalBody>
    </FullScreenDiv>
  );
}
