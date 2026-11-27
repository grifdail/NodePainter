import { Color, Vector2 } from "./vectorDataType";


export type BloomPostProcessLayer = {
    effectType: "PostProcess3D/Bloom",
    luminanceThreshold: number,
    luminanceSmoothing: number,
    intensity: number,
    radius: number,
};

export type BlurPostProcessLayer = {
    effectType: "PostProcess3D/Blur"
};

export type VignettePostProcessLayer = {
    effectType: "PostProcess3D/Vignette",
    offset: number,
    darkness: number,
}

export type SepiaPostProcessLayer = {
    effectType: "PostProcess3D/Sepia",
    intensity: number,
}
export type ColorAverageProcessLayer = {
    effectType: "PostProcess3D/ColorAverage",
}

export type TiltShiftPostProcessLayer = {
    effectType: "PostProcess3D/TiltShift",
    offset: number,
    rotation: number,
    focusArea: number,
    feather: number,
}

export type DepthOfFieldPostProcessLayer = {
    effectType: "PostProcess3D/DepthOfField",
    focusDistance: number,
    focusRange: number,
    bokehScale: number,
}

export type ChromaticAberrationPostProcessLayer = {
    effectType: "PostProcess3D/ChromaticAberration",
    offset: Vector2,
    radialModulation: boolean,
    modulationOffset: number,
}


export type BrightnessContrastProcessLayer = {
    effectType: "PostProcess3D/BrightnessContrast",
    brightness: number,
    contrast: number,
}

export type DepthProcessLayer = {
    effectType: "PostProcess3D/Depth",
    inverted: boolean,
}

export type ColorDepthProcessLayer = {
    effectType: "PostProcess3D/ColorDepth",
    bits: number,
}

export type HueSaturationPostProcessLayer = {
    effectType: "PostProcess3D/HueSaturation",
    hue: number,
    saturation: number,
}
export type ScanlineEffectPostProcessLayer = {
    effectType: "PostProcess3D/ScanlineEffect",
    density: number,
}


export type ToneMappingPostProcessLayer = {
    effectType: "PostProcess3D/ToneMapping",
    resolution: number,
    whitePoint: number,
    middleGrey: number,
    minLuminance: number,
    averageLuminance: number,
    adaptationRate: number,
}

export type LensDistortionPostProcessLayer = {
    effectType: "PostProcess3D/LensDistortion",
    distortion: Vector2,
    principalPoint: Vector2,
    focalLength: Vector2,
    skew: number,
}


export type FogPostProcessLayer = {
    effectType: "PostProcess3D/Fog",
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





