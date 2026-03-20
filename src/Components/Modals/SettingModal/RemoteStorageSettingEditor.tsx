import { useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { useRemoteStorage } from "../../../Hooks/useRemoteStorage";
import { toastInfo } from "../../../Hooks/useToast";
import { Button } from "../../Generics/Button";
import { TextInput } from "../../Generics/Inputs/TextInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { TextInputAndButton } from "./ImportPaletteField";
import { IconDownload, IconLogin, IconLogout, IconUpload } from "@tabler/icons-react";

function RemoteStorageConnected({ userAdress, disconnect, savePref, loadPref }: {
    userAdress: string;
    disconnect: () => void
    savePref: () => void
    loadPref: () => void
}) {
    return <div>
        <p>Connected to remoteStorage as {userAdress}</p>
        <ButtonGroup>
            <Button
                label="Disconnect"
                icon={IconLogout}
                onClick={disconnect}></Button>
            <Button
                label="Save your settings online"
                icon={IconUpload}
                onClick={savePref}></Button>
            <Button
                label="Load your settings"
                icon={IconDownload}
                onClick={loadPref}></Button>
        </ButtonGroup>
    </div>;
}

function RemoteStorageDisconected({ connect }: {
    connect: (userAdress: string) => void
}) {
    const [userAdress, setUserAdress] = useState("user@server")
    return <TextInputAndButton>
        <TextInput

            value={userAdress}
            onChange={(e) => setUserAdress(e)} />
        <ButtonGroup>
            <Button
                icon={IconLogin}
                label="Connect"
                onClick={() => connect(userAdress)}></Button>

        </ButtonGroup>
    </TextInputAndButton>
}


export const RemoteStorageSettingEditor = () => {
    const { isConnected, connect, userAdress, disconnect, syncPlayerPref, savePlayerPref } = useRemoteStorage()
    const content = isConnected ? <RemoteStorageConnected userAdress={userAdress} disconnect={disconnect} savePref={savePlayerPref} loadPref={syncPlayerPref} /> : <RemoteStorageDisconected connect={connect}></RemoteStorageDisconected>

    return (
        <div>
            <p>Node painter data are all stored localy, in your browser or in file you download manualy (via `save to json`).
                We do not store (or have access to) any of your data and we're not gonna take that responsability, ever.
            </p>
            <p>
                However, if you still want the benefit of cloud synchronisation, you can provide your own cloud storage via the <a href="https://remotestorage.io/">remoteStorage protocol</a>.
            </p>
            {
                content
            }
        </div>
    );
};
