import { useEffect } from "react";
import { ToastData, useToast } from "../Hooks/useToast";
import styled from "styled-components";
import { animated, useTransition } from "@react-spring/web";

const StyledContainerDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: var(--padding-medium);
  display: flex;
  gap: var(--padding-medium);
  max-width: 80;
  width: 300px;
  flex-direction: column;

  @media (max-width: 840px) {
    width: 80%;
    right: 50%;
    top: auto;
    bottom: 0;
    transform: translate(50%, 0);
  }
`;

const StyledDiv = styled(animated.div)`
  background: var(--color-background-card);

  display: flex;
  border: 1px solid var(--color-border-input);
  flex-direction: row;
  align-items: center;
  padding: var(--padding-large);
  gap: var(--padding-small);
  box-shadow: var(--card-shadow);
  color: var(--color-text);
  border-radius: var(--border-radius-large);

  & p {
    flex: 1 1 auto;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  &.error svg {
    color: #ff004d;
  }
  &.success svg {
    color: #008751;
  }
`;

export function ToastContainer({}: {}) {
  var toast = useToast((state) => state.toasts);
  var remove = useToast((state) => state.remove);

  const transitions = useTransition(toast, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    keys: (item) => item.id,
  });

  return (
    <StyledContainerDiv>
      {transitions((style, toast) => (
        <Toast
          style={style}
          key={toast.id}
          toast={toast}
          onRemove={remove}></Toast>
      ))}
    </StyledContainerDiv>
  );
}

function Toast({ toast, onRemove, style }: { toast: ToastData; onRemove: (toast: string) => void; style: any }) {
  const Icon = toast.icon;
  const type = toast.type || "normal";

  useEffect(() => {
    setTimeout(() => {
      onRemove(toast.id);
    }, (toast.duration || 15) * 1000);
  }, []);

  return (
    <StyledDiv
      className={type}
      style={style}>
      {Icon && <Icon />}
      <p>{toast.message}</p>
    </StyledDiv>
  );
}
