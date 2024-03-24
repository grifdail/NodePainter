import { Modal } from "../Modal";
import styled from "styled-components";
import { IconSettings } from "@tabler/icons-react";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { PaletteSetting } from "../Settings/PaletteSetting";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;

  & textarea {
    flex: 1 0 100px;
  }
`;

export function SettingsModal({ close }: { close: () => void }) {
  const colorPreset = usePlayerPref((state) => state.colorPreset);
  const setColorPreset = usePlayerPref((state) => state.setColorPreset);

  return (
    <Modal onClose={close} title="Settings" icon={IconSettings}>
      <MainDiv>
        Color preset:
        <PaletteSetting value={colorPreset} onChange={setColorPreset} def={{ id: "colorPreset", defaultValue: [], type: "palette" }}></PaletteSetting>
      </MainDiv>
    </Modal>
  );
}
