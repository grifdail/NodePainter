import { Menu, MenuItem } from "@szhsin/react-menu"
import { AnimationSequenceGenerator } from "../../../Utils/animationSequence/AnimationSequenceGenerator"
import { Button } from "../../Generics/Button"
import { IconPlus } from "@tabler/icons-react"
import { AnimationSequenceBlockType } from "../../../Utils/animationSequence/AnimationSequenceData"
import { AddButtonStyled } from "../CodeBlock/CodeBlockStatementList"

export const AnimationSequenceSelectorDropdown = ({ onSelect, label }: { label: string, onSelect: (type: AnimationSequenceBlockType) => void }) => {
    return <Menu align="center" menuButton={<AddButtonStyled>
        <IconPlus></IconPlus>
    </AddButtonStyled>}>
        {
            Object.keys(AnimationSequenceGenerator).map((type) => {
                return <MenuItem key={type} onClick={() => onSelect(type as AnimationSequenceBlockType)} >{type}</MenuItem>
            })
        }
    </Menu>
}
