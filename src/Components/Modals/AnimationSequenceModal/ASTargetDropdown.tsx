import { AnimationSequenceData, AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { convertTypeValue } from "../../../Utils/graph/execution/convertTypeValue";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { Fieldset } from "../../StyledComponents/Fieldset";

export const ASTargetDropdown: React.FC<{
    animation: AnimationSequenceData;
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}> = ({ animation, block, onChange }) => {
    if (!("target" in block)) {
        return null;
    }

    return <Fieldset
        label={"Target"}
        input={DropdownInput}
        passtrough={{
            options: animation.properties.map(p => p.id)
        }}
        onChange={(id: any) => {
            var portDef = animation.properties.find(p => p.id === id);
            let newBlock = block;
            if (portDef) {
                newBlock = {
                    ...block,
                    target: {
                        type: portDef.type,
                        id: id,
                        location: "properties"
                    }
                };
                if ("value" in block) {
                    var newValue = convertTypeValue(block.value, block.target.type, portDef.type);
                    newBlock = {
                        ...newBlock,
                        value: newValue
                    };
                    onChange(newBlock);
                }

            }
        }}
        value={block.target?.id} />;
};
