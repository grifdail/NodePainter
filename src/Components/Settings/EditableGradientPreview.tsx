import { useEffect, useRef, useState } from "react";
import { Gradient, GradientStop } from "../../Types/vectorDataType";
import { evaluateGradient, toHex } from "../../Utils/colorUtils";
import { GradientDiv } from "./ColorPreview";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { IconArrowUp } from "@tabler/icons-react";

const StyledGradientStop = styled.span<{ pos: number; color: string }>`
  position: absolute;
  left: ${(props) => props.pos}%;
  width: 5px;
  height: 32px;
  color: ${(props) => props.color};
  cursor: pointer;
  transform: translateX(-16px);
`;

const StyledStopContainter = styled.div`
  display: block;
  height: 32px;
  background: transparent;
  margin-top: 5px;
  margin-bottom: 5px;
  min-width: 100px;
  position: relative;
`;

export const EditableGradientPreview = ({ gradient, onChange }: { gradient: Gradient; onChange: (value: any) => void }) => {
  var [localCopy, setLocalCopy] = useState(structuredClone(gradient));
  const bind = useDrag(({ args: [i, item], tap, active, delta: [x, y] }) => {
    if (parent.current) {
      var rect = parent.current.getBoundingClientRect();
      var pos = Math.min(1, Math.max(item.pos + x / rect.width, 0));
      var newItem = { ...localCopy[i], pos: pos };

      var newList = [...localCopy.slice(0, i), newItem, ...localCopy.slice(i + 1, localCopy.length)];

      newList.sort((a: GradientStop, b: GradientStop) => a.pos - b.pos);
      setLocalCopy(newList);
      if (!active) {
        onChange(newList);
      }
    }
  });

  function onDoubleClick(event: any) {
    if (parent.current) {
      var rect = parent.current.getBoundingClientRect();
      var x = (event.clientX - rect.x) / rect.width;

      const newList: Gradient = [
        ...(gradient as any),
        {
          pos: x,
          color: evaluateGradient(gradient, x),
        },
      ];
      newList.sort((a: GradientStop, b: GradientStop) => a.pos - b.pos);
      onChange(newList);
    }
  }

  useEffect(() => {
    setLocalCopy(structuredClone(gradient));
  }, [gradient]);

  var parent = useRef<HTMLDivElement>(null);

  var str = gradient.map((stop) => `${toHex(stop.color, true)} ${Math.floor(stop.pos * 100)}%`).join(",");
  return (
    <div>
      <GradientDiv gradient={str} onDoubleClick={onDoubleClick}></GradientDiv>
      <StyledStopContainter ref={parent} onDoubleClick={onDoubleClick}>
        {localCopy.map((stop: GradientStop, i: number) => (
          <StyledGradientStop color={toHex(stop.color)} pos={Math.floor(stop.pos * 100)} {...bind(i, stop)}>
            <IconArrowUp></IconArrowUp>
          </StyledGradientStop>
        ))}
      </StyledStopContainter>
    </div>
  );
};
