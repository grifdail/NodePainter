import { navigate } from "wouter/use-browser-location";
import { Routes } from "../Types/Routes";

export const closeAllPopup = () => {
    navigate(Routes.Default);
}


export const openAboutModal = () => {
    navigate(Routes.About);
}
export const openCodeblockModal = () => {
    navigate(Routes.CodeBlock);
}
export const openCustomFunctionModal = () => {
    navigate(Routes.CustomFunction);
}
export const openCustomShaderModal = () => {
    navigate(Routes.CustomShader);
}
export const openCustomSimulationModal = () => {
    navigate(Routes.CustomSimulation);
}
export const openGifExportModal = () => {
    navigate(Routes.ExportGif);
}
export const openLoadModal = () => {
    navigate(Routes.Load);
}
export const openNodeCreationModal = () => {
    navigate(Routes.NodeCreation);
}
export const openPaintModal = () => {
    navigate(Routes.Paint);
}
export const openSettingModal = () => {
    navigate(Routes.Settings);
}
export const openSketchMenu = () => {
    navigate(Routes.SketchMenu);
}
export const openSaveModal = () => {
    navigate(Routes.Save);
}