import { Menu, MenuItem } from "@szhsin/react-menu"
import { AnimationSequenceGenerator } from "../../../Utils/animationSequence/AnimationSequenceGenerator"
import { Button } from "../../Generics/Button"
import { IconPlus } from "@tabler/icons-react"
import { AnimationSequenceBlockType } from "../../../Utils/animationSequence/AnimationSequenceData"

export const AnimationSequenceSelectorDropdown = ({ onSelect, label }: { label: string, onSelect: (type: AnimationSequenceBlockType) => void }) => {
    return <Menu menuButton={<Button label={label} icon={IconPlus} />}>
        {
            Object.keys(AnimationSequenceGenerator).map((type) => {
                return <MenuItem key={type} onClick={() => onSelect(type as AnimationSequenceBlockType)} >{type}</MenuItem>
            })
        }
    </Menu>
}
