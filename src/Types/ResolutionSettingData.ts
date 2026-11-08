export type ResolutionSettingData = {
    mode: "scaled";
    scale: number;
} | {
    mode: "original";
} | {
    mode: "static";
    width: number;
    height: number;
};
