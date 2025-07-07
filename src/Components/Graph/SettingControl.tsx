import { SettingDefinition } from "../../Types/SettingDefinition";
import { NodeData } from "../../Types/NodeData";
import { SettingComponents } from "../Settings/SettingsComponents";
import { SettingComponent } from "../Settings/SettingComponent";
import { memo } from "react";

export const SettingControl = memo(({ y, value, def, onChange, nodeData, useHTML }: { y: number; useHTML?: boolean; value: any; nodeData: NodeData; def: SettingDefinition; onChange: (params: any) => void }) => {
  var DefinedComponent = SettingComponents[def.type] as SettingComponent<any>;
  var height = DefinedComponent.getSize(value, def, nodeData);
  if (useHTML) {
    return (
      <DefinedComponent
        value={value}
        def={def}
        onChange={onChange}
        node={nodeData}
      />
    );
  }
  return (
    <g transform={`translate(0, ${y})`}>
      <foreignObject
        x="14"
        height={height}
        width="274">
        <DefinedComponent
          value={value}
          def={def}
          onChange={onChange}
          node={nodeData}
        />
      </foreignObject>
    </g>
  );
});
export const getSettingHeight = (value: any, def: SettingDefinition, nodeData: NodeData) => {
  var DefinedComponent = SettingComponents[def.type];
  return DefinedComponent.getSize(value, def as any, nodeData);
};
