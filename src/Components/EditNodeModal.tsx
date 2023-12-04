import { useTree } from "../Hooks/useTree";
import { Modal } from "./Modal";
import styled from "styled-components";
import { IconDeviceFloppy, IconFileUpload, IconFunctionFilled, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ButtonGroup } from "./StyledComponents/ButtonGroup";
import { NodeDefinition, PortDefinition } from "../Data/NodeDefinition";
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { PortColor } from "./StyledComponents/PortColor";
import { TextInput } from "./TextInput";
import { PortType, PortTypeDefaultValue } from "../Data/PortType";

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

  & > section {
    display: flex;
    flex-direction: column;
    & > div.port-field {
      display: flex;
      flex-direction: row;
      height: 50px;
      gap: 10px;

      & > div {
        display: flex;
        flex: 1 1 100%;
        align-items: stretch;
        justify-content: stretch;

        & * {
          display: block;
          flex: 1 1 100%;
        }
      }
      & > button {
        flex: 0 0 50px;
      }
    }
  }
`;

type PortPosition = "input" | "output";

export function InputPortEdit({ port, callbacks, index, type }: { port: PortDefinition; callbacks: EditNodeTypeCallback; index: number; type: PortPosition }) {
  const portColor = PortColor[port.type];
  const PortValueEditor = portColor.input;
  return (
    <div className="port-field">
      <div>
        <input value={port.id} onChange={(e) => callbacks.setPortId(type, index, e.target.value)}></input>
      </div>
      <div>
        <Menu menuButton={<MenuButton>{port.type}</MenuButton>}>
          <MenuRadioGroup value={port.type}>
            <MenuItem value="number" onClick={() => callbacks.setPortType(type, index, "number")}>
              number
            </MenuItem>
            <MenuItem value="vector2" onClick={() => callbacks.setPortType(type, index, "vector2")}>
              vector2{" "}
            </MenuItem>
            <MenuItem value="color" onClick={() => callbacks.setPortType(type, index, "color")}>
              color
            </MenuItem>
            <MenuItem value="string" onClick={() => callbacks.setPortType(type, index, "string")}>
              string
            </MenuItem>
            <MenuItem value="bool" onClick={() => callbacks.setPortType(type, index, "bool")}>
              bool
            </MenuItem>
          </MenuRadioGroup>
        </Menu>
      </div>
      <div>{PortValueEditor && <PortValueEditor onChange={(value) => callbacks.setPortDefaultValue(type, index, value)} value={port.defaultValue}></PortValueEditor>}</div>

      <button onClick={() => callbacks.deletePort(type, index)}>
        <IconX />
      </button>
    </div>
  );
}

type EditNodeTypeCallback = {
  setPortId(type: PortPosition, index: number, value: string): void;
  setPortDefaultValue(type: PortPosition, index: number, value: any): void;
  deletePort(type: PortPosition, index: number): void;
  setPortType(type: PortPosition, index: number, arg2: string): void;
  create: () => void;
  cancel: () => void;
  addOutput: () => void;
  addInputs: () => void;
  setId: (id: string) => void;
  setCanBeExecuted: (value: boolean) => void;
};

function useDefinitionSettings(source: NodeDefinition, confirm: (result: NodeDefinition) => void, cancel: () => void): [NodeDefinition, EditNodeTypeCallback] {
  var [state, setState] = useState(source);
  return [
    state,
    {
      setId: (id: string) => {
        setState({ ...state, id: id });
      },
      setCanBeExecuted: (value: boolean) => {
        setState({ ...state, canBeExecuted: true });
      },
      create() {
        confirm(state);
      },
      cancel() {
        cancel();
      },
      addOutput() {
        setState({
          ...state,
          outputPorts: [
            ...state.outputPorts,
            {
              id: `port-${state.outputPorts.length}`,
              type: "number",
              defaultValue: 0,
            },
          ],
        });
      },
      addInputs() {
        setState({
          ...state,
          inputPorts: [
            ...state.inputPorts,
            {
              id: `port-${state.inputPorts.length}`,
              type: "number",
              defaultValue: 0,
            },
          ],
        });
      },
      setPortType(type, index, value) {
        const target = type === "output" ? state.outputPorts : state.inputPorts;
        var result = [
          ...target.slice(0, index),
          {
            ...target[index],
            type: value as PortType,
            defaultValue: PortTypeDefaultValue[value] as any,
          },
          ...target.slice(index + 1),
        ];
        setState({
          ...state,
          inputPorts: type === "output" ? state.inputPorts : result,
          outputPorts: type === "output" ? result : state.outputPorts,
        });
      },
      setPortDefaultValue(type, index, value) {
        const target = type === "output" ? state.outputPorts : state.inputPorts;
        var result = [
          ...target.slice(0, index),
          {
            ...target[index],
            defaultValue: value,
          },
          ...target.slice(index + 1),
        ];
        setState({
          ...state,
          inputPorts: type === "output" ? state.inputPorts : result,
          outputPorts: type === "output" ? result : state.outputPorts,
        });
      },
      setPortId(type, index, value) {
        const target = type === "output" ? state.outputPorts : state.inputPorts;
        var result = [
          ...target.slice(0, index),
          {
            ...target[index],
            id: value,
          },
          ...target.slice(index + 1),
        ];
        setState({
          ...state,
          inputPorts: type === "output" ? state.inputPorts : result,
          outputPorts: type === "output" ? result : state.outputPorts,
        });
      },
      deletePort(type, index) {
        const target = type === "output" ? state.inputPorts : state.inputPorts;
        var result = [...target.slice(0, index), ...target.slice(index + 1)];
        setState({
          ...state,
          inputPorts: type === "output" ? state.inputPorts : result,
          outputPorts: type === "output" ? result : state.outputPorts,
        });
      },
    },
  ];
}

export function EditNodeModal({ close }: { close: () => void }) {
  var [def, callbacks] = useDefinitionSettings(
    {
      id: "new-node",
      IsUnique: false,
      description: "Custom function",
      inputPorts: [],
      outputPorts: [],
      tags: ["Custom"],
      settings: [],
      getData: null,
      execute: null,
      canBeExecuted: false,
      executeOutputPorts: [],
      executeAs: "CustomFunction",
    },
    (nodeDef) => {
      useTree.getState().createFunction(nodeDef);
    },
    close
  );

  return (
    <Modal onClose={close} title="Edit Node" icon={IconFunctionFilled}>
      <MainDiv>
        <section>
          <fieldset>
            <label>Name</label>
            <TextInput value={def.id} onChange={callbacks.setId}></TextInput>
          </fieldset>
          <fieldset>
            <label>Can be executed</label>
            <input type="checkbox" onChange={(e) => callbacks.setCanBeExecuted(!def.canBeExecuted)}></input>
          </fieldset>
        </section>
        <section>
          <h3>Inputs</h3>
          {def.inputPorts.map((port, i) => (
            <InputPortEdit key={i} port={port} callbacks={callbacks} index={i} type="input" />
          ))}
          <ButtonGroup>
            <button onClick={callbacks.addInputs}>Add</button>
          </ButtonGroup>
        </section>
        <section>
          <h3>Outputs</h3>
          {def.outputPorts.map((port, i) => (
            <InputPortEdit key={i} port={port} index={i} type="output" callbacks={callbacks} />
          ))}
          <ButtonGroup>
            <button onClick={callbacks.addOutput}>Add</button>
          </ButtonGroup>
        </section>
        <ButtonGroup>
          <button onClick={callbacks.cancel}>Cancel</button>
          <button onClick={callbacks.create}>Create</button>
        </ButtonGroup>
      </MainDiv>
    </Modal>
  );
}
