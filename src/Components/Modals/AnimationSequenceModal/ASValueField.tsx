import { IconClock, IconPencil, IconProps } from "@tabler/icons-react";
import { PortType } from "../../../Types/PortType";
import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { RawValueField } from "../../Generics/RawValueField";
import { ParameterExpressionView } from "../CodeBlock/ParameterExpressionView";
import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { PortTypeIcon } from "../../Generics/PortTypeIcon";

export const ASValueField: React.FC<{
    block: AnimationSequenceBlock;
    type?: PortType;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}> = ({ block, onChange, type }) => {

    type ||= ("target" in block ? block.target.type : "unknown");

    if (type === undefined || type === "unknown" || !("value" in block)) {
        return null;
    }

    return <div className="field">
        <span><PortTypeIcon type={block.value.targetType as PortType} /> Value</span>
        <div>
            <ParameterExpressionView parameter={block.value} onChange={(e) => {
                onChange({ ...block, value: e });
            }} />
        </div>
    </div>;
};


