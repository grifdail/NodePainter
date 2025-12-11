import { IconBrush, IconClearAll, IconLayersIntersect2, IconLayersOff, IconLayersSelected, IconLayersSelectedBottom, IconPlayerPause, IconPlayerPlay, IconPlus, IconTrash } from "@tabler/icons-react";
import styled from "styled-components";
import { PaintingStore, PaintingTool, usePainting } from "../../../Hooks/usePainting";
import { useDialog } from "../../../Hooks/useDialog";
import { Tools } from "../Drawing/Tools";
import { Modal } from "../../Modal";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { ColorInput } from "../../Generics/Inputs/ColorInput";
import { SliderInput } from "../../Generics/Inputs/SliderInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { PaletteColorSelector } from "../Drawing/PaletteColorSelector";
import { Button } from "../../Generics/Button";
import { useCallback, useEffect, useMemo } from "react";
import { Flipbook } from "../../../Types/FlipBook";
import { useParams } from "wouter";
import { useTree } from "../../../Hooks/useTree";
import { closeAllPopup } from "../../../Actions/navigationAction";
import { FlipbookSketch } from "./FlipbookSketch";
import { ExponantialSliderInput } from "../../Generics/Inputs/ExponantialSlider";
import { cp } from "fs";
import { useFlipbookDrawingState } from "./useFlipbookDrawingState";
import { Menu, MenuItem } from "@szhsin/react-menu";


const MainDiv = styled.div`
  width: 100%;
  //overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: var(--padding-medium);
  align-items: stretch;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ToolDiv = styled.div`
  gap: var(--padding-medium);
  display: flex;
  flex-direction: column;
  flex: 1 1 400px;

  & > hr {
    appearance: none;
    flex: 1 1 0;
    align-items: stretch;
    opacity: 0;
  }

  @media (max-width: 800px) {
    flex: 1 1 0;

    & > hr {
      appearance: none;
      flex: 0 0 0;
      align-items: stretch;
      opacity: 0;
    }
  }
`;

const OnionSkinIcon = {
    "none": IconLayersOff,
    "past": IconLayersSelectedBottom,
    "futur": IconLayersSelected,
    "both": IconLayersIntersect2
}


export function FlipbookDrawingModal() {

    const { defaultValue, save } = useModificationType();

    const {
        animation, color, setColor, lineWidth, setLineWidth,
        setPalette, palette, clear, addLine, removeLine,
        frame, setFrame,
        addFrame, removeFrame,
        playMode, fps, setFPS, togglePlayMode,
        onionSkinMode, setOnionSkinMode
    } = useFlipbookDrawingState(defaultValue)

    const close = useCallback(() => {
        closeAllPopup();
        save(animation)
    }, [animation, save])

    usePlayModeControl(playMode, fps, animation, setFrame);


    return (
        <Modal
            onClose={close}
            title="Paint"
            icon={IconBrush}
            size="small">
            <MainDiv>

                <FlipbookSketch
                    useOnionSkin={true}
                    frame={frame}
                    animation={animation}
                    color={color}
                    lineWidth={lineWidth}
                    editMode={"draw"}
                    addLine={addLine}
                    removeLine={removeLine}
                />

                <ToolDiv>
                    <div><Fieldset
                        label="FPS"
                        input={SliderInput as any}
                        value={fps}
                        onChange={setFPS}
                        passtrough={{ min: 0, max: 60, }}></Fieldset>
                        <Fieldset
                            label="Frame"
                            input={SliderInput as any}
                            value={frame}
                            onChange={setFrame}
                            passtrough={{ min: 0, max: animation.length - 1 }}></Fieldset>


                        <ButtonGroup>
                            <Button icon={playMode === "pause" ? IconPlayerPlay : IconPlayerPause} onClick={togglePlayMode} />
                            <Menu menuButton={<Button icon={OnionSkinIcon[onionSkinMode]} />}>
                                {
                                    Object.entries(OnionSkinIcon).map(([key, Icon]) => <MenuItem onClick={() => setOnionSkinMode(key as keyof typeof OnionSkinIcon)}><Icon /> {key}</MenuItem>)
                                }
                            </Menu>
                            <Button icon={IconPlus} label="Add Frame" onClick={addFrame} />
                            <Button icon={IconTrash} label="Remove current Frame" onClick={() => removeFrame()} />
                        </ButtonGroup>
                    </div>
                    <hr></hr>
                    <Fieldset
                        label="Color"
                        value={color}
                        input={ColorInput}
                        onChange={setColor}
                    />
                    <Fieldset
                        label="Line Width"
                        input={ExponantialSliderInput as any}
                        value={lineWidth}
                        onChange={setLineWidth}
                        passtrough={{ min: 0, max: 1, valueAtHalfway: 0.2 }}
                    />
                    <hr></hr>
                    <PaletteColorSelector
                        onChangePalette={setPalette}
                        onSelectColor={setColor}
                        currentPalette={palette}
                        currentColor={color}
                    />
                    <ButtonGroup>
                        <Button
                            icon={IconClearAll}
                            label="New image"
                            onClick={clear}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Clear"
                        />
                    </ButtonGroup>
                </ToolDiv>
            </MainDiv>
        </Modal>
    );
}

function usePlayModeControl(playMode: string, fps: number, animation: Flipbook, setFrame: (newFrame: number) => void) {
    useEffect(() => {
        if (playMode === "pause") {
            return;
        }
        let timeStart = Date.now();
        let currentFrame = 0;
        const update = () => {
            const time = (Date.now() - timeStart) / 1000;
            const targetFrame = Math.floor(time * fps) % animation.length;
            if (targetFrame != currentFrame) {
                currentFrame = targetFrame;
                setFrame(targetFrame);
            }
            animationFrame = requestAnimationFrame(update);
        };

        let animationFrame = requestAnimationFrame(update);
        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [playMode, fps, animation.length]);
}

function useModificationType() {
    const params = useParams();
    const modificationType = params.type as string;
    const modificationId = params.id as string;

    const defaultValue = useMemo(() => {
        if (modificationType === "node") {
            return useTree.getState().nodes[modificationId]?.settings.flipbook || [[]];
        }
        return [[]]
    }, [modificationId, modificationType])

    const save = useCallback((newValue: Flipbook) => {
        if (modificationType === "node") {
            return useTree.getState().setNodeSetting(modificationId, "flipbook", newValue);
        }

    }, [modificationId, modificationType])

    return { defaultValue, save }
}

