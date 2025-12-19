import styled from "styled-components";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { TagList } from "../../Generics/CategoryButton";
import { Modal } from "../../Modal";
import { SavedPaletteEditor } from "./SavedPaletteEditor";
import { SavedGradientEditor } from "./SavedGradientEditor";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { NodeData } from "../../../Types/NodeData";
import { PaletteSetting } from "../../Settings/PaletteSetting";
import { SavedSnippetEditor } from "./SavedSnippetEditor";
import { ExportSettingEditor } from "./ExportSettingEditor";
import { MiscSettingEditor } from "./MiscSettingEditor";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;

  & .content {
    display: flex;
    flex-direction: column;
    gap: var(--padding-small);
  }
`;

enum Section {
  DefaultPalette = "Default Palette",
  SavedPalette = "SavedPalette",
  SavedGradient = "SavedGradient",
  SavedSnippet = "SavedSnippet",
  Misc = "Misc",
  ExportSetting = "ExportSetting",
}

const DefaultPaletteEdition = () => {
  const colorPreset = usePlayerPref((state) => state.colorPreset);
  const setColorPreset = usePlayerPref((state) => state.setColorPreset);

  return (
    <PaletteSetting.UI value={colorPreset}
      onChange={setColorPreset}
      def={{ id: "colorPreset", defaultValue: [], type: "palette" }}
      node={null as unknown as NodeData} />
  );
};

const EmptyDiv = () => {
  return <div>Not implemented yet</div>;
};

const SectionComponent: { [key in Section]: () => JSX.Element } = {
  [Section.DefaultPalette]: DefaultPaletteEdition,
  [Section.SavedPalette]: SavedPaletteEditor,
  [Section.SavedGradient]: SavedGradientEditor,
  [Section.SavedSnippet]: SavedSnippetEditor,
  [Section.Misc]: MiscSettingEditor,
  [Section.ExportSetting]: ExportSettingEditor,
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
        <TagList
          options={Object.fromEntries(Object.values(Section).map((tag) => [tag, section === tag]))}
          onClick={(tag) => setSection(tag as Section)}></TagList>
        <div className="content">
          <Body />
        </div>
      </MainDiv>
    </Modal>
  );
}
