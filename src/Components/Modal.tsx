import React from "react";
import { Icon, IconX } from "@tabler/icons-react";
import { FullScreenDiv } from "./StyledComponents/FullScreenDiv";
import { ModalBody } from "./StyledComponents/ModalBody";
import { useSpring } from "@react-spring/web";

export function Modal({ children, title, icon: Icon, onClose, big = false }: { children?: any; title?: string; big?: boolean; icon?: Icon; onClose?: () => void }) {
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
      <ModalBody big={big} style={styles}>
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
