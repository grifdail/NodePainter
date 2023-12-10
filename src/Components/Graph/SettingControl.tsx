import { SettingDefinition } from "../../Data/NodeDefinition";
import { NodeData } from "../../Hooks/useTree";
import { SettingComponents } from "../Settings/SettingsComponents";

export const SettingControl = ({ y, value, def, onChange, nodeData }: { y: number; value: any; nodeData: NodeData; def: SettingDefinition; onChange: (params: any) => void }) => {
  var DefinedComponent = SettingComponents[def.type];
  var height = DefinedComponent.getSize(value, def, nodeData);
  return (
    <g>
      <rect x="20" y={y} height={height} width="260" fill="rgba(0,0,0,0.1)"></rect>
      <foreignObject x="25" y={y} height={height} width="250">
        <DefinedComponent value={value} def={def} onChange={onChange} nodeData={nodeData} />
      </foreignObject>
    </g>
  );
};
