import { IconX } from "@tabler/icons-react";
import { PortRole } from "../../Types/PortRole";
import { PortDefinition } from "../../Types/PortDefinition";
import { PortType } from "../../Types/PortType";
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { PortColor } from "../StyledComponents/PortColor";
import { CustomFunctionCreationContextStore } from "../../Types/CustomFunctionCreationContextStore";
import { capitalCase } from "change-case";

export function InputPortEdit({ port, context, index, role, availableTypes }: { port: PortDefinition; context: CustomFunctionCreationContextStore; index: number; role: PortRole; availableTypes: Array<PortType> }) {
  const portColor = PortColor[port.type];
  const PortValueEditor = portColor.input;
  return (
    <div className="port-field">
      <div className="id">
        <input value={port.id} onChange={(e) => context.setPortId(role, index, e.target.value)}></input>
      </div>
      <div className="type">
        <Menu menuButton={<MenuButton>{capitalCase(port.type)}</MenuButton>}>
          <MenuRadioGroup value={port.type}>
            {availableTypes.map((type) => {
              return (
                <MenuItem key={type} value={type} onClick={() => context.setPortType(role, index, type)}>
                  {capitalCase(type)}
                </MenuItem>
              );
            })}
          </MenuRadioGroup>
        </Menu>
      </div>
      <div className="default-value">{PortValueEditor && <PortValueEditor onChange={(value) => context.setPortDefaultValue(role, index, value)} value={port.defaultValue}></PortValueEditor>}</div>

      <button className="remove" onClick={() => context.deletePort(role, index)}>
        <IconX />
      </button>
    </div>
  );
}
