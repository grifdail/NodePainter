import { ReactComponentLike } from "prop-types";
import { memo } from "react";
import { Route, Switch } from "wouter";
import { closeAllPopup } from "../Actions/navigationAction";
import { useDialog } from "../Hooks/useDialog";
import { Routes } from "../Types/Routes";
import { GridUi } from "./GridUi";
import { AboutModal } from "./Modals/AboutModal";
import { AnimationSequenceModal } from "./Modals/AnimationSequenceModal/AnimationSequenceModal";
import { CodeBlockModal } from "./Modals/CodeBlock/CodeBlockModal";
import { JavascriptFunctionModal } from "./Modals/CodeBlock/JavascriptFunctionModal";
import { CustomNodeModal } from "./Modals/CustomNodes/CustomFunctionModal";
import { CustomShaderModal } from "./Modals/CustomNodes/CustomShaderModal";
import { CustomSimulationModal } from "./Modals/CustomNodes/CustomSimulationModal";
import { DialogModal } from "./Modals/DialogModal";
import { ExportGifModal } from "./Modals/ExportGifModal";
import { FlipbookDrawingModal } from "./Modals/FlipbookDrawingModal/FlipbookDrawingModal";
import { LoadModal } from "./Modals/LoadModal";
import { NodeSelectionModal } from "./Modals/NodeSelectionModal";
import { PaintModal } from "./Modals/PaintModal";
import { SaveModal } from "./Modals/SaveModal";
import { SettingsModal } from "./Modals/SettingModal/SettingsModal";
import { SketchModal } from "./Modals/SketchModal";

const LocalRoute = ({ path, component: Component }: { path?: string, component: ReactComponentLike }) => {
    return <Route path={path} component={() => <Component close={closeAllPopup} />} />;
}

export function Router() {

    return (
        <div>
            <RouterSwitch />

            <DialogControl />
        </div>
    );
}

const DialogControl = memo(() => {
    const dialog = useDialog();

    return <>
        {dialog.dialogs.map((d) => (
            <DialogModal
                key={d.id}
                dialog={d}
                controler={dialog}></DialogModal>
        ))}
    </>
})


const RouterSwitch = () => {
    return <Switch>
        <LocalRoute path={Routes.NodeCreation} component={NodeSelectionModal} />
        <LocalRoute path={Routes.Save} component={SaveModal} />
        <LocalRoute path={Routes.Load} component={LoadModal} />
        <LocalRoute path={Routes.ExportGif} component={ExportGifModal} />
        <LocalRoute path={Routes.CustomFunction} component={CustomNodeModal} />
        <LocalRoute path={Routes.CustomShader} component={CustomShaderModal} />
        <LocalRoute path={Routes.CustomSimulation} component={CustomSimulationModal} />
        <LocalRoute path={Routes.Settings} component={SettingsModal} />
        <LocalRoute path={Routes.About} component={AboutModal} />
        <LocalRoute path={Routes.Paint} component={PaintModal} />
        <LocalRoute path={Routes.CodeBlock} component={CodeBlockModal} />
        <LocalRoute path={Routes.SketchMenu} component={SketchModal} />
        <LocalRoute path={Routes.JavascriptFunction} component={JavascriptFunctionModal} />
        <LocalRoute path={Routes.PaintAnimation} component={FlipbookDrawingModal} />
        <LocalRoute path={Routes.AnimationSequence} component={AnimationSequenceModal} />
        <LocalRoute component={GridUi} />

    </Switch>
}