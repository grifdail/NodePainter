import { Modal } from "./Modal";
import styled from "styled-components";
import { IconFunctionFilled, IconX } from "@tabler/icons-react";
import { ButtonGroup } from "./StyledComponents/ButtonGroup";
import { NodeDefinition, PortDefinition, PortRole } from "../Data/NodeDefinition";
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { PortColor } from "./StyledComponents/PortColor";
import { TextInput } from "./TextInput";
import { CustomFunctionCreationContextStore, useCustomNodeCreationContext } from "./useCustomNodeCreationContext";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  justify-content: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;
  overflow: auto;

  & > section {
    display: flex;
    flex-direction: column;
    & fieldset {
      border: none;
      display: flex;
      flex-direction: row;

      align-items: center;
      & label {
        flex: 1 1 0;
      }
    }
    gap: 2px;

    & > div.port-field {
      display: flex;
      flex-direction: row;
      height: 50px;
      gap: 10px;

      & button.remove {
        border: none;
        background: none;
      }

      & > div {
        display: flex;
        flex: 1 1 100%;
        align-items: stretch;

        & > * {
          display: block;
          flex: 1 1 10px;
        }
        &.type button {
          border: 2px solid black;
          background: none;
        }

        &.default-value > * {
          display: block flex;
          flex: 1 1 10px;
          flex-direction: column;
          margin: 0;
          padding: 0;
          & input[type="checkbox"] {
            justify-self: stretch;
            align-items: stretch;
            flex: 1 1 10px;
          }
        }
        &.default-value > button {
          justify-content: center;
          align-items: center;
        }
      }
      & > button {
        flex: 0 0 50px;
      }
    }
  }
`;

export function InputPortEdit({ port, context, index, type }: { port: PortDefinition; context: CustomFunctionCreationContextStore; index: number; type: PortRole }) {
  const portColor = PortColor[port.type];
  const PortValueEditor = portColor.input;
  return (
    <div className="port-field">
      <div className="id">
        <input value={port.id} onChange={(e) => context.setPortId(type, index, e.target.value)}></input>
      </div>
      <div className="type">
        <Menu menuButton={<MenuButton>{port.type}</MenuButton>}>
          <MenuRadioGroup value={port.type}>
            <MenuItem value="number" onClick={() => context.setPortType(type, index, "number")}>
              number
            </MenuItem>
            <MenuItem value="vector2" onClick={() => context.setPortType(type, index, "vector2")}>
              vector2{" "}
            </MenuItem>
            <MenuItem value="color" onClick={() => context.setPortType(type, index, "color")}>
              color
            </MenuItem>
            <MenuItem value="string" onClick={() => context.setPortType(type, index, "string")}>
              string
            </MenuItem>
            <MenuItem value="bool" onClick={() => context.setPortType(type, index, "bool")}>
              bool
            </MenuItem>
          </MenuRadioGroup>
        </Menu>
      </div>
      <div className="default-value">{PortValueEditor && <PortValueEditor onChange={(value) => context.setPortDefaultValue(type, index, value)} value={port.defaultValue}></PortValueEditor>}</div>

      <button className="remove" onClick={() => context.deletePort(type, index)}>
        <IconX />
      </button>
    </div>
  );
}

export function CustomNodeModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <Modal onClose={close} title="Edit Node" icon={IconFunctionFilled}>
      <MainDiv>
        <section>
          <fieldset>
            <label>Name</label>
            <TextInput value={def.id} onChange={context.setId}></TextInput>
          </fieldset>
          <fieldset>
            <label>Can be executed</label>
            <input type="checkbox" onChange={(e) => context.setCanBeExecuted(!def.canBeExecuted)}></input>
          </fieldset>
        </section>
        <section>
          <h3>Inputs</h3>
          {def.inputPorts.map((port, i) => (
            <InputPortEdit key={i} port={port} context={context} index={i} type="inputData" />
          ))}
          <ButtonGroup>
            <button onClick={context.addInputs}>Add</button>
          </ButtonGroup>
        </section>
        <section>
          <h3>Outputs</h3>
          {def.outputPorts.map((port, i) => (
            <InputPortEdit key={i} port={port} index={i} type="outputData" context={context} />
          ))}
          <ButtonGroup>
            <button onClick={context.addOutput}>Add</button>
          </ButtonGroup>
        </section>
        <ButtonGroup>
          <button onClick={context.cancel}>Cancel</button>
          <button onClick={context.create}>Create</button>
        </ButtonGroup>
      </MainDiv>
    </Modal>
  );
}
