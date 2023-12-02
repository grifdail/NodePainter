import { SettingDefinition } from "../Data/NodeDefinition";
import { SettingComponents } from "./SettingsComponents";

export const SettingControl = ({ y, value, def, onChange }: { y: number; value: any; def: SettingDefinition; onChange: (params: any) => void }) => {
  var DefinedComponent = SettingComponents[def.type];
  var height = DefinedComponent.getSize(value, def);
  return (
    <g>
      <rect x="20" y={y} height={height} width="260" fill="rgba(0,0,0,0.1)"></rect>
      <foreignObject x="25" y={y} height={height} width="250">
        <DefinedComponent value={value} def={def} onChange={onChange} />
      </foreignObject>
    </g>
  );
};
