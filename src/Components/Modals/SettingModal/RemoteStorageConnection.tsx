import { useState, useCallback } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { toastSuccess, toastError } from "../../../Hooks/useToast";
import { createColor } from "../../../Types/vectorDataType";
import { fromHex } from "../../../Utils/math/colorUtils";
import { Button } from "../../Generics/Button";
import { TextInput } from "../../Generics/Inputs/TextInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { RemoteStorage } from "../../../Utils/storage/remoteStorage";

export const TextInputAndButton = styled.div`
    display:flex;
    align-items: center;
    gap:  var(--padding-small);


`


export function RemoteStorageConnection() {
    const [url, setRawUrl] = useState("url");
    const connect = useCallback(async () => {
        RemoteStorage.connect(url)
    }, [url]);

    return <TextInputAndButton>
        <TextInput

            value={url}
            onChange={(e) => setRawUrl(e)} />
        <ButtonGroup>
            <Button
                label="Connect to a remoteStorage server"
                onClick={() => connect()}></Button>

        </ButtonGroup>
    </TextInputAndButton>;
}
