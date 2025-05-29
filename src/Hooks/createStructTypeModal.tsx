import { TextInput } from "../Components/Generics/Inputs/TextInput";
import { PortEditListInput } from "../Components/Modals/CustomNodes/PortEditList";
import { useDialog } from "../Hooks/useDialog";
import { PortDefinition } from "../Types/PortDefinition";
import { portTypesWithTags } from "../Types/PortTypeDefinitions";
import { useTree } from "./useTree";

export const createStructTypeModal = (name: string, ports: PortDefinition[]) => {
  useDialog.getState().open({
    callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
      if (button === "confirm" && fieldResult && fieldResult.name && fieldResult.fields) {
        useTree.getState().createStructType(fieldResult.fields, fieldResult.name);
      }
    },
    buttons: [
      {
        key: "cancel",
        label: "Cancel",
        style: "invisible",
      },
      {
        key: "confirm",
        label: "Confirm",
        style: "normal",
      },
    ],
    fields: [
      {
        key: "name",
        label: "Name",
        input: TextInput,
        defaultValue: name,
      },
      {
        key: "fields",
        label: "",
        input: PortEditListInput,
        defaultValue: ports,
        passTrough: {
          label: "Fields",
          prefix: "field",
          availableTypes: portTypesWithTags(["common"], []),
        },
      },
    ],
  });
};
