import { animated, FrameValue, to } from "@react-spring/web";
import { GraphArea } from "../../Types/GraphArea";
import { toHex } from "../../Utils/math/colorUtils";
import { Color } from "../../Types/vectorDataType";
import { styled } from "styled-components";
import { vectorMultiplication } from "../../Utils/math/vectorUtils";
import { NodeData } from "../../Types/NodeData";
import { selectNodeInAreas } from "../../Nodes/Misc/AreaCommentNode";

const Rect = styled.rect<{ $color: Color }>`
  stroke: ${(props) => toHex(props.$color, true)};
  stroke-width: 10px;
  fill: ${(props) => toHex(vectorMultiplication(props.$color, [1, 1, 1, 0.3]) as Color, true)};
  rx: var(--border-radius-large);
  ry: var(--border-radius-large);
`;
const Text = styled.text`
  font-size: 25px;
  fill: var(--color-text);
`;

export function GraphAreaRect({ base, area, node }: { base: FrameValue<number[]>; area: GraphArea; node: NodeData }) {
  return (
    <animated.g transform={base.to((x, y) => (area.relative ? `translate(${x + area.x}, ${y + area.y})` : `translate(${area.x}, ${area.y}) scale(1)`))}>
      <Rect
        as={animated.rect}
        x="0"
        y="0"
        width={area.width}
        height={area.height}
        $color={area.color}></Rect>
      <Text
        onClick={() => selectNodeInAreas(area, node, true)}
        x="10 "
        y="35">
        {area.name}
      </Text>
    </animated.g>
  );
}
