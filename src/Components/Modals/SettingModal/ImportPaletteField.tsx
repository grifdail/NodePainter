import { useState, useCallback } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { toastSuccess, toastError } from "../../../Hooks/useToast";
import { createColor } from "../../../Types/vectorDataType";
import { fromHex } from "../../../Utils/math/colorUtils";
import { Button } from "../../Generics/Button";
import { TextInput } from "../../Generics/Inputs/TextInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import styled from "styled-components";

export const TextInputAndButton = styled.div`
    display:flex;
    align-items: center;
    gap:  var(--padding-small);


`


export function ImportPaletteField() {
    const [url, setRawUrl] = useState("url");
    const loadFromUrl = useCallback(async () => {
        try {


            const request = await fetch(url);
            const json = await request.json();
            const playerPref = usePlayerPref.getState();

            Object.entries(json).forEach(([name, palette]) => {
                if (!Array.isArray(palette)) {
                    return;
                }
                if (typeof palette[0] === "string") {
                    playerPref.savePalette(name, palette.map(fromHex));
                    return;
                }
                if (typeof Array.isArray(palette[0])) {
                    playerPref.savePalette(name, palette.map(c => createColor(...c)));
                    return;
                }
            });
            toastSuccess("Palette successfully imported");
        }
        catch (err) {
            toastError("Something went wrong");
        }


    }, [url]);

    return <TextInputAndButton>
        <TextInput

            value={url}
            onChange={(e) => setRawUrl(e)} />
        <ButtonGroup>
            <Button
                label="Load from URL"
                onClick={() => loadFromUrl()}></Button>

        </ButtonGroup>
    </TextInputAndButton>;
}
