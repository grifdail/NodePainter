import React from "react";
import { Icon, IconX } from "@tabler/icons-react";
import { useSpring } from "@react-spring/web";
import { animated } from "@react-spring/web";
import styled, { css, RuleSet } from "styled-components";

export type ModalSize = "small" | "medium" | "large" | "tiny" | "fullscreen";

export const FullScreenDiv = styled.div<{ $modal: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$modal ? "var(--color-screen)" : "none")};
  pointer-events: ${(props) => (props.$modal ? "auto" : "none")};
`;

const ModalSizeCSS: { [key in ModalSize]: RuleSet } = {
  small: css`
    width: 50%;
    min-height: 200px;
    max-height: 80%;
  `,
  medium: css`
    width: 70%;
    min-height: 200px;
    max-height: 80%;
  `,
  large: css`
    width: 80%;
    min-height: 500px;
    height: 80%;
    max-height: 90%;
  `,
  tiny: css`
    width: auto;
    max-width: 33%;
    min-height: 100px;
    height: auto;
    max-height: 50%;

    @media (max-width: 840px) {
      max-width: 90%;
      max-height: 90%;
      height: auto;
      border: var(--border-size) solid #333;
      border-radius: var(--border-radius-large);
    }
  `,

  fullscreen: css`
    width: 100%;
    height: 100%;
    min-width: 100%;
    flex-grow: 1;
    border-radius: 0;
  `,
};

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0;
  flex-grow: 0;
  flex-shrink: 0;
  height: 62px;

  & h2 {
    flex-grow: 1;
  }

  @media (max-width: 840px) {
    height: 32px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  aspect-ratio: 1;
  padding: 0px;
  border: none;

  border-radius: var(--border-radius-large);

  position: absolute;
  top: var(--padding-large);
  right: var(--padding-large);

  transition: color 0.3s;

  &:hover {
    color: rgba(0, 0, 0, 0.3);
  }

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export const ModalContent = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex-shrink: 1;
  flex-grow: 1;
  flex-direction: column;
  position: relative;
`;

export const ModalBody = styled(animated.div)<{ size?: ModalSize; stretch?: boolean }>`
  overflow: auto;
  background: var(--color-background);
  color: var(--color-text);
  padding: var(--padding-large);
  border: var(--border-size) solid #333;
  border-radius: var(--border-radius-large);
  box-shadow: var(--card-shadow);
  @media (max-width: 840px) {
    width: 100%;
    border-radius: 0;
    border: none;
    height: 100%;
    max-height: 100%;
    min-height: 0;
  }
  ${(props) => ModalSizeCSS[props.size || "medium"]}
  ${(props) => (props.stretch ? " height: auto;" : "")}

  

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  position: relative;

  & > & > section {
  }
`;

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
    <FullScreenDiv $modal>
      <ModalBody
        size={size}
        style={styles}
        stretch={stretch}>
        <ModalHeader>
          {Icon && <Icon />}
          <h2>{title}</h2>
          {onClose && (
            <CloseButton
              onClick={onClose}
              data-tooltip-id="tooltip"
              data-tooltip-content={`Close`}>
              <IconX />
            </CloseButton>
          )}
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </FullScreenDiv>
  );
}
