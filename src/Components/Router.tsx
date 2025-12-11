import { GridUi } from "./GridUi";
import { NodeSelectionModal } from "./Modals/NodeSelectionModal";
import { SaveModal } from "./Modals/SaveModal";
import { LoadModal } from "./Modals/LoadModal";
import { ExportGifModal } from "./Modals/ExportGifModal";
import { CustomNodeModal } from "./Modals/CustomNodes/CustomFunctionModal";
import { CustomShaderModal } from "./Modals/CustomNodes/CustomShaderModal";
import { CustomSimulationModal } from "./Modals/CustomNodes/CustomSimulationModal";
import { AboutModal } from "./Modals/AboutModal";
import { PaintModal } from "./Modals/PaintModal";
import { useDialog } from "../Hooks/useDialog";
import { DialogModal } from "./Modals/DialogModal";
import { Routes } from "../Types/Routes";
import { CodeBlockModal } from "./Modals/CodeBlock/CodeBlockModal";
import { SketchModal } from "./Modals/SketchModal";
import { SettingsModal } from "./Modals/SettingModal/SettingsModal";
import { Route, Switch, useLocation } from "wouter";
import { ReactComponentLike } from "prop-types";
import { memo, useCallback, useMemo } from "react";
import { closeAllPopup } from "../Actions/navigationAction";
import { JavascriptFunctionModal } from "./Modals/CodeBlock/JavascriptFunctionModal";
import { FlipbookDrawingModal } from "./Modals/FlipbookDrawingModal/FlipbookDrawingModal";

const LocalRoute = ({ path, component: Component }: { path?: string, component: ReactComponentLike }) => {
  const [location, navigate] = useLocation();
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
    <LocalRoute component={GridUi} />

  </Switch>
}