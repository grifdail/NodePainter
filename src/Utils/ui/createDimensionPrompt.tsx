import { NumberInput } from "../../Components/Generics/Inputs/NumberInput";
import { DialogData, useDialog } from "../../Hooks/useDialog";


export function createDimensionPrompt(callback: (width: number, height: number) => void) {
    var modal: DialogData = {
        callback: function (button: any, fieldResult: { [key: string]: any; } | undefined): void {
            if (button === "cancel" || fieldResult === undefined) {
                return;
            }
            callback(fieldResult.width, fieldResult.height);
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
                key: "width",
                label: "width",
                input: NumberInput,
                defaultValue: 400,
            },
            {
                key: "height",
                label: "height",
                input: NumberInput,
                defaultValue: 400,
            },
        ],
    };
    useDialog.getState().open(modal);
}
