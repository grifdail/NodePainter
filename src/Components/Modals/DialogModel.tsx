import { IconInfoCircle } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { DialogData, DialogStore } from "../../Hooks/useDialog";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Button, InvisibleButton } from "../Generics/Button";
import { Fieldset } from "../StyledComponents/Fieldset";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-medium);
`;

export function DialogModal({ dialog, controler }: { dialog: DialogData; controler: DialogStore }) {
  return (
    <Modal
      title={dialog.header}
      icon={IconInfoCircle}
      size="tiny">
      <MainDiv>
        {dialog.text}
        <div>
          {dialog.fields.map((field) => (
            <Fieldset
              key={field.key}
              label={field.label}
              input={field.input}
              onChange={function (value: any): void {
                controler.setField(dialog.id as string, field.key, value);
              }}
              value={dialog.fieldResult && dialog.fieldResult[field.key]}
              passtrough={field.passTrough}
              tooltip={field.tooltip}></Fieldset>
          ))}
        </div>
        <ButtonGroup>
          {dialog.buttons.map((btn) => {
            if (btn.style === "invisible") {
              return (
                <InvisibleButton
                  key={btn.key}
                  label={btn.label}
                  icon={btn.icon}
                  onClick={() => controler.clickButton(dialog.id as string, btn.key)}></InvisibleButton>
              );
            } else {
              return (
                <Button
                  key={btn.key}
                  label={btn.label}
                  icon={btn.icon}
                  onClick={() => controler.clickButton(dialog.id as string, btn.key)}></Button>
              );
            }
          })}
        </ButtonGroup>
      </MainDiv>
    </Modal>
  );
}
