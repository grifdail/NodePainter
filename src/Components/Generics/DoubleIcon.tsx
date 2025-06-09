import { Icon, IconProps } from "@tabler/icons-react";
import styled from "styled-components";

const ParentSpan = styled.svg<{ scaleSubIcon: number }>`
  position: relative;

  & svg:nth-child(1) {
    transform-origin: left top;
    transform: scale(${(props) => props.scaleSubIcon}%);
  }

  & svg:nth-child(2) {
    position: absolute;
    bottom: 0;
    right: 0;
    transform-origin: right bottom;
    transform: scale(${(props) => props.scaleSubIcon}%);
  }
`;

export function DoubleIcon(Main: Icon, Secondary: Icon, scale: number = 75): Icon {
  return (props: IconProps) => {
    return (
      <ParentSpan
        width={24}
        height={24}
        {...(props as any)}
        scaleSubIcon={scale}>
        <Main></Main>
        <Secondary></Secondary>
      </ParentSpan>
    );
  };
}
