import { Color, Vector2 } from "./vectorDataType";


export type BloomPostProcessLayer = {
    effectType: "PostProcess3D/Bloom",
    id: string,
    luminanceThreshold: number,
    luminanceSmoothing: number,
    intensity: number,
    radius: number,
};

export type BlurPostProcessLayer = {
    effectType: "PostProcess3D/Blur"
    id: string,
};

export type VignettePostProcessLayer = {
    effectType: "PostProcess3D/Vignette",
    id: string,
    offset: number,
    darkness: number,
}

export type SepiaPostProcessLayer = {
    effectType: "PostProcess3D/Sepia",
    id: string,
    intensity: number,
}
export type ColorAverageProcessLayer = {
    effectType: "PostProcess3D/ColorAverage",
    id: string,
}

export type TiltShiftPostProcessLayer = {
    effectType: "PostProcess3D/TiltShift",
    id: string,
    offset: number,
    rotation: number,
    focusArea: number,
    feather: number,
}

export type DepthOfFieldPostProcessLayer = {
    effectType: "PostProcess3D/DepthOfField",
    id: string,
    focusDistance: number,
    focusRange: number,
    bokehScale: number,
}

export type ChromaticAberrationPostProcessLayer = {
    effectType: "PostProcess3D/ChromaticAberration",
    id: string,
    offset: Vector2,
    radialModulation: boolean,
    modulationOffset: number,
}


export type BrightnessContrastProcessLayer = {
    effectType: "PostProcess3D/BrightnessContrast",
    id: string,
    brightness: number,
    contrast: number,
}

export type DepthProcessLayer = {
    effectType: "PostProcess3D/Depth",
    id: string,
    inverted: boolean,
}

export type ColorDepthProcessLayer = {
    effectType: "PostProcess3D/ColorDepth",
    id: string,
    bits: number,
}

export type HueSaturationPostProcessLayer = {
    effectType: "PostProcess3D/HueSaturation",
    id: string,
    hue: number,
    saturation: number,
}
export type ScanlineEffectPostProcessLayer = {
    effectType: "PostProcess3D/ScanlineEffect",
    id: string,
    density: number,
}


export type ToneMappingPostProcessLayer = {
    effectType: "PostProcess3D/ToneMapping",
    id: string,
    resolution: number,
    whitePoint: number,
    middleGrey: number,
    minLuminance: number,
    averageLuminance: number,
    adaptationRate: number,
}

export type LensDistortionPostProcessLayer = {
    effectType: "PostProcess3D/LensDistortion",
    id: string,
    distortion: Vector2,
    principalPoint: Vector2,
    focalLength: Vector2,
    skew: number,
}


export type FogPostProcessLayer = {
    effectType: "PostProcess3D/Fog",
    id: string,
    minRange: number,
    maxRange: number,
    colorStart: Color,
    colorEnd: Color,
}



export type PostProcessLayer =
    BloomPostProcessLayer |
    SepiaPostProcessLayer |
    TiltShiftPostProcessLayer |
    VignettePostProcessLayer |
    BlurPostProcessLayer |
    DepthOfFieldPostProcessLayer |
    BrightnessContrastProcessLayer |
    ColorAverageProcessLayer |
    ChromaticAberrationPostProcessLayer |
    DepthProcessLayer |
    ColorDepthProcessLayer |
    ScanlineEffectPostProcessLayer |
    ToneMappingPostProcessLayer |
    LensDistortionPostProcessLayer |
    FogPostProcessLayer |
    HueSaturationPostProcessLayer
export type PostProcessLayerType = PostProcessLayer["effectType"];





