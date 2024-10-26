import React from "react";
import { Icon, IconX } from "@tabler/icons-react";
import { FullScreenDiv } from "./StyledComponents/FullScreenDiv";
import { ModalBody, ModalSize } from "./StyledComponents/ModalBody";
import { useSpring } from "@react-spring/web";

export function Modal({ children, title, icon: Icon, onClose, stretch, size = "medium" }: { children?: any; title?: string; size?: ModalSize; stretch?: boolean; icon?: Icon; onClose?: () => void }) {
  const styles = useSpring({
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
  });
  return (
    <FullScreenDiv modal>
      <ModalBody size={size} style={styles} stretch>
        <header>
          {Icon && <Icon />}
          <h2>{title}</h2>
          <button onClick={onClose} data-tooltip-id="tooltip" data-tooltip-content={`Close`}>
            <IconX></IconX>
          </button>
        </header>
        <section>{children}</section>
      </ModalBody>
    </FullScreenDiv>
  );
}
