import { Modal } from "../Modal";
import styled from "styled-components";
import { IconSettings } from "@tabler/icons-react";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { PaletteSetting } from "../Settings/PaletteSetting";
import { NodeData } from "../../Types/NodeData";
import { CategoryButton, TagList } from "./CategoryButton";
import { useState } from "react";
import { PalettePreview } from "../Settings/ColorPreview";
import { Button } from "../Generics/Button";
import { SavedPaletteEditor } from "./SavedPaletteEditor";

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

enum Section {
  DefaultPalette = "Default Palette",
  SavedPalette = "SavedPalette",
  SavedFunction = "SavedFunction",
  Misc = "Misc",
}

const DefaultPaletteEdition = () => {
  const colorPreset = usePlayerPref((state) => state.colorPreset);
  const setColorPreset = usePlayerPref((state) => state.setColorPreset);

  return (
    <PaletteSetting
      value={colorPreset}
      onChange={setColorPreset}
      def={{ id: "colorPreset", defaultValue: [], type: "palette" }}
      node={null as unknown as NodeData}></PaletteSetting>
  );
};

const EmptyDiv = () => {
  const savedPalettes = usePlayerPref((pref) => pref.palettes);
  return <div></div>;
};
const SectionComponent: { [key in Section]: () => JSX.Element } = {
  [Section.DefaultPalette]: DefaultPaletteEdition,
  [Section.SavedPalette]: SavedPaletteEditor,
  [Section.SavedFunction]: EmptyDiv,
  [Section.Misc]: EmptyDiv,
};

export function SettingsModal({ close }: { close: () => void }) {
  const [section, setSection] = useState(Section.DefaultPalette);
  const Body = SectionComponent[section];

  return (
    <Modal
      onClose={close}
      title="Settings"
      icon={IconSettings}>
      <MainDiv>
        <TagList>
          {Object.values(Section).map((tag) => (
            <CategoryButton
              key={tag}
              selected={section === tag}
              onClick={() => setSection(tag as Section)}>
              {tag}
            </CategoryButton>
          ))}
        </TagList>
        <div className="content">
          <Body />
        </div>
      </MainDiv>
    </Modal>
  );
}
