import { IconKeyframes, IconPlus } from "@tabler/icons-react";
import { Modal } from "../../Modal";
import { PortTypeDefinitions, portTypesWith, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { closeAllPopup } from "../../../Actions/navigationAction";
import { useTimelineModalSave } from "../AnimationSequenceModal/useAnimationSequenceModalSave";
import { useCallback, useRef } from "react";
import { useTimelineModalControlls } from "./useTimelineModalControlls";
import { NumberInput } from "../../Generics/Inputs/NumberInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { AddButtonStyled } from "../CodeBlock/CodeBlockStatementList";
import { useDialog } from "../../../Hooks/useDialog";
import { PortType } from "../../../Types/PortType";
import { TrackDisplay } from "./TrackDisplay";
import { TimelineStyle } from "./TimelineStyle";
import { TrackLine } from "./TrackLine";


const allowedPortType = portTypesWith(def => {
    return def.tags.includes("common") && !!def.inlineInput && !def.tags.includes("hidden");
});


export function TimelineModal() {
    const { defaultValue, save } = useTimelineModalSave();
    const { timeline, cursor, setCursor, addTrack, editedKeyframe, setKeyframe, setTrack } = useTimelineModalControlls(defaultValue)


    const askNameThenAddTrack = useCallback((type: PortType) => {
        useDialog.getState().openPrompt((name) => {
            if (name) {
                addTrack(name, type);
            }
        }, "Name for the new track")
    }, [addTrack])

    return (
        <Modal
            onClose={() => {
                save(timeline);
                closeAllPopup();
            }}
            title="Timeline"
            icon={IconKeyframes}
            size="large" >
            <TimelineStyle>
                <div className="timeline-controls track-display" >
                    <div className="track-info">
                        <div>
                            <NumberInput value={cursor} onChange={setCursor}></NumberInput>
                        </div>

                    </div>

                    <TrackLine cursor={cursor} onMoveCursor={setCursor} name={"time"} />
                </div>
                {
                    Object.entries(timeline).map(([name, track]) => {
                        return <TrackDisplay
                            key={name}
                            track={track}
                            cursor={cursor}
                            name={name}
                            setEditedKeyframe={setKeyframe}
                            editedKeyframe={editedKeyframe}
                            onChangeTrack={setTrack}
                            onMoveCursor={setCursor} />
                    })
                }
                <ButtonGroup align="stretch">
                    <Menu align="center" menuButton={<AddButtonStyled className="add-button">
                        <IconPlus></IconPlus>
                    </AddButtonStyled>}>
                        {
                            allowedPortType.map((type) => {
                                const Icon = PortTypeDefinitions[type as PortType].icon
                                const color = PortTypeDefinitions[type as PortType].color
                                return <MenuItem key={type} onClick={() => askNameThenAddTrack(type as PortType)} ><Icon color={color} /> {type}</MenuItem>
                            })
                        }
                    </Menu>
                </ButtonGroup>
            </TimelineStyle>
        </Modal>
    );
}


