import { BloomEffect, BokehEffect, BrightnessContrastEffect, ChromaticAberrationEffect, ColorAverageEffect, ColorDepthEffect, DepthEffect, DepthOfFieldEffect, EffectComposer, EffectPass, HueSaturationEffect, KawaseBlurPass, LensDistortionEffect, ScanlineEffect, SepiaEffect, TiltShiftEffect, ToneMappingEffect, VignetteEffect } from "postprocessing";
import { Camera, Scene, Vector2 as TVector2, Vector4 as TVector4 } from "three";
import { FogEffect } from "../Utils/3d/FogEffect";
import { Color, Vector2 } from "./vectorDataType";


type BloomPostProcessLayer = {
    effectType: "Bloom",
    luminanceThreshold: number,
    luminanceSmoothing: number,
    intensity: number,
    radius: number,
};

type BlurPostProcessLayer = {
    effectType: "Blur"
};

type VignettePostProcessLayer = {
    effectType: "Vignette",
    offset: number,
    darkness: number,
}

type SepiaPostProcessLayer = {
    effectType: "Sepia",
    intensity: number,
}
type ColorAverageProcessLayer = {
    effectType: "ColorAverage",
}

type TiltShiftPostProcessLayer = {
    effectType: "TiltShift",
    offset: number,
    rotation: number,
    focusArea: number,
    feather: number,
}

type DepthOfFieldPostProcessLayer = {
    effectType: "DepthOfField",
    focusDistance: number,
    focusRange: number,
    bokehScale: number,
}

type ChromaticAberrationPostProcessLayer = {
    effectType: "ChromaticAberration",
    offset: Vector2,
    radialModulation: boolean,
    modulationOffset: number,
}

type BokehPostProcessLayer = {
    effectType: "Bokeh",
    focus: number,
    dof: number,
    aperture: number,
    maxBlur: number,
}

type BrightnessContrastProcessLayer = {
    effectType: "BrightnessContrast",
    brightness: number,
    contrast: number,
}

type DepthProcessLayer = {
    effectType: "Depth",
    inverted: boolean,
}

type ColorDepthProcessLayer = {
    effectType: "ColorDepth",
    bits: number,
}

type HueSaturationPostProcessLayer = {
    effectType: "HueSaturation",
    hue: number,
    saturation: number,
}
type ScanlineEffectPostProcessLayer = {
    effectType: "ScanlineEffect",
    density: number,
}


type ToneMappingPostProcessLayer = {
    effectType: "ToneMapping",
    resolution: number,
    whitePoint: number,
    middleGrey: number,
    minLuminance: number,
    averageLuminance: number,
    adaptationRate: number,
}

type LensDistortionPostProcessLayer = {
    effectType: "LensDistortion",
    distortion: Vector2,
    principalPoint: Vector2,
    focalLength: Vector2,
    skew: number,
}


export type FogPostProcessLayer = {
    effectType: "Fog",
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
    BokehPostProcessLayer |
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

export function validateEffectLayer(struct: any) {
    return struct && typeof struct === "object" && (typeof struct.effectType === "string" && PostProcessLayerUtils[struct.effectType as PostProcessLayerType] !== undefined)
}
export function validateEffectLayers(list: any) {
    return list.filter(validateEffectLayer) as PostProcessLayer[]
}

type PostProcessSetting<TPostProcessLayer extends PostProcessLayer> = {
    default: TPostProcessLayer,
    addEffect: (layer: TPostProcessLayer, composer: EffectComposer, camera: Camera, scene: Scene) => void;
}
export const PostProcessLayerUtils: { [TDefinition in PostProcessLayer as TDefinition["effectType"]]: PostProcessSetting<TDefinition> } = {
    Bloom: {
        default: {
            effectType: "Bloom",
            luminanceThreshold: 0.8,
            luminanceSmoothing: 0.5,
            intensity: 2,
            radius: 0.5
        },
        addEffect: function (layer: BloomPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new BloomEffect({
                intensity: layer.intensity,
                luminanceThreshold: layer.luminanceThreshold,
                luminanceSmoothing: layer.luminanceSmoothing,
                radius: layer.radius,
            })));
        }
    },
    Blur: {
        default: {
            effectType: "Blur"
        },
        addEffect: function (layer: BlurPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new KawaseBlurPass({}));
        }
    },
    Vignette: {
        default: {
            effectType: "Vignette",
            offset: 0,
            darkness: 0.5
        },
        addEffect: function (layer: VignettePostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new VignetteEffect({
                offset: layer.offset,
                darkness: layer.darkness,
            })));
        }
    },
    Sepia: {
        default: {
            effectType: "Sepia",
            intensity: 1
        },
        addEffect: function (layer: SepiaPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new SepiaEffect({ intensity: layer.intensity })));
        }
    },
    TiltShift: {
        default: {
            effectType: "TiltShift",
            offset: 0,
            rotation: 0,
            focusArea: 0.4,
            feather: 0.3
        },
        addEffect: function (layer: TiltShiftPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new TiltShiftEffect({
                offset: layer.offset,
                rotation: layer.rotation,
                focusArea: layer.focusArea,
                feather: layer.feather,
            })));
        }
    },
    DepthOfField: {
        default: {
            effectType: "DepthOfField",
            focusDistance: 3,
            focusRange: 2,
            bokehScale: 1
        },
        addEffect: function (layer: DepthOfFieldPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new DepthOfFieldEffect(camera, {
                focusDistance: layer.focusDistance,
                focusRange: layer.focusRange,
                bokehScale: layer.bokehScale,
            })));
        }
    },
    Bokeh: {
        default: {
            effectType: "Bokeh",
            focus: 0.5,
            dof: 0.02,
            aperture: 0.015,
            maxBlur: 1
        },
        addEffect: function (layer: BokehPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new BokehEffect({
                focus: layer.focus,
                dof: layer.dof,
                aperture: layer.aperture,
                maxBlur: layer.maxBlur,
            })));
        }
    },
    BrightnessContrast: {
        default: {
            effectType: "BrightnessContrast",
            brightness: 0,
            contrast: 0
        },
        addEffect: function (layer: BrightnessContrastProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new BrightnessContrastEffect({
                brightness: layer.brightness,
                contrast: layer.contrast,
            })));
        }
    },
    ChromaticAberration: {
        default: {
            effectType: "ChromaticAberration",
            offset: [0.01, 0.01],
            radialModulation: true,
            modulationOffset: 0.15
        },
        addEffect: function (layer: ChromaticAberrationPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new ChromaticAberrationEffect({
                offset: new TVector2(...layer.offset),
                radialModulation: layer.radialModulation,
                modulationOffset: layer.modulationOffset,
            })));
        }
    },
    ColorAverage: {
        default: {
            effectType: "ColorAverage",
        },
        addEffect: function (layer: ColorAverageProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new ColorAverageEffect()));
        }
    },
    Depth: {
        default: {
            effectType: "Depth",
            inverted: false
        },
        addEffect: function (layer: DepthProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new DepthEffect({
                inverted: layer.inverted
            })));
        }
    },
    ColorDepth: {
        default: {
            effectType: "ColorDepth",
            bits: 16
        },
        addEffect: function (layer: ColorDepthProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new ColorDepthEffect({
                bits: layer.bits
            })));
        }
    },
    HueSaturation: {
        default: {
            effectType: "HueSaturation",
            hue: 0,
            saturation: 0
        },
        addEffect: function (layer: HueSaturationPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new HueSaturationEffect({
                hue: layer.hue,
                saturation: layer.saturation
            })));
        }
    },
    ScanlineEffect: {
        default: {
            effectType: "ScanlineEffect",
            density: 1.25
        },
        addEffect: function (layer: ScanlineEffectPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new ScanlineEffect({
                density: layer.density,
            })));
        }
    },
    ToneMapping: {
        default: {
            effectType: "ToneMapping",
            resolution: 256,
            whitePoint: 4,
            middleGrey: 0.6,
            minLuminance: 0.01,
            averageLuminance: 1,
            adaptationRate: 1
        },
        addEffect: function (layer: ToneMappingPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new ToneMappingEffect({
                resolution: layer.resolution,
                whitePoint: layer.whitePoint,
                middleGrey: layer.middleGrey,
                minLuminance: layer.minLuminance,
                averageLuminance: layer.averageLuminance,
                adaptationRate: layer.adaptationRate,
            })));
        }
    },
    LensDistortion: {
        default: {
            effectType: "LensDistortion",
            distortion: [0.1, 0.1],
            principalPoint: [0, 0],
            focalLength: [1, 1],
            skew: 0
        },
        addEffect: function (layer: LensDistortionPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new LensDistortionEffect({
                distortion: new TVector2(...layer.distortion),
                principalPoint: new TVector2(...layer.principalPoint),
                focalLength: new TVector2(...layer.focalLength),
                skew: layer.skew,
            })));
        }
    },
    Fog: {
        default: {
            effectType: "Fog",
            minRange: 0,
            maxRange: 20,
            colorStart: [1, 1, 1, 1],
            colorEnd: [1, 1, 1, 1]
        },
        addEffect: function (layer: FogPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new FogEffect({
                minRange: layer.minRange,
                maxRange: layer.maxRange,
                colorStart: new TVector4(...layer.colorStart),
                colorEnd: new TVector4(...layer.colorEnd),
            })));
        }
    }
}


export function createPostProcessLayer(type: PostProcessLayerType = "Bloom"): PostProcessLayer {
    var data = PostProcessLayerUtils[type];
    return structuredClone(data.default);
}