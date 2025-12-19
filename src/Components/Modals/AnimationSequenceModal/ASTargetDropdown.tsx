import { IconVariable } from "@tabler/icons-react";
import { AnimationSequenceBlock, AnimationSequenceData } from "../../../Utils/animationSequence/AnimationSequenceData";
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

    return <div className="field">
        <span><IconVariable /> Target</span>
        <div >
            <Fieldset
                label={""}
                input={DropdownInput}
                passtrough={{
                    options: animation.properties.map(p => p.id)
                }}
                onChange={(id: any) => {
                    const oldType = block.target.type;
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
                        if ("value" in block && oldType !== portDef.type) {
                            const oldParam = block.value
                            newBlock = {
                                ...newBlock,
                                value: {
                                    ...oldParam,
                                    expression: null,
                                    targetType: portDef.type,
                                    constantValue: structuredClone(portDef.defaultValue)
                                }
                            };
                            console.log("aaaaaaaaaaaaa", newBlock, oldParam)

                        }
                        onChange(newBlock)

                    }
                }}
                value={block.target?.id} /></div >
    </div >;
};
