import { BloomEffect, BokehEffect, BrightnessContrastEffect, ChromaticAberrationEffect, ColorAverageEffect, ColorDepthEffect, DepthEffect, DepthOfFieldEffect, EffectComposer, EffectPass, HueSaturationEffect, KawaseBlurPass, LensDistortionEffect, ScanlineEffect, SepiaEffect, TiltShiftEffect, ToneMappingEffect, VignetteEffect } from "postprocessing";
import { Camera, Vector2 as TVector2 } from "three";
import { Vector2 } from "./vectorDataType";


type BloomPostProcessLayer = {
    type: "Bloom",
    luminanceThreshold: number,
    luminanceSmoothing: number,
    intensity: number,
    radius: number,
};

type BlurPostProcessLayer = {
    type: "Blur"
};

type VignettePostProcessLayer = {
    type: "Vignette",
    offset: number,
    darkness: number,
}

type SepiaPostProcessLayer = {
    type: "Sepia",
    intensity: number,
}
type ColorAverageProcessLayer = {
    type: "ColorAverage",
}

type TiltShiftPostProcessLayer = {
    type: "TiltShift",
    offset: number,
    rotation: number,
    focusArea: number,
    feather: number,
}

type DepthOfFieldPostProcessLayer = {
    type: "DepthOfField",
    focusDistance: number,
    focusRange: number,
    bokehScale: number,
}

type ChromaticAberrationPostProcessLayer = {
    type: "ChromaticAberration",
    offset: Vector2,
    radialModulation: boolean,
    modulationOffset: number,
}

type BokehPostProcessLayer = {
    type: "Bokeh",
    focus: number,
    dof: number,
    aperture: number,
    maxBlur: number,
}

type BrightnessContrastProcessLayer = {
    type: "BrightnessContrast",
    brightness: number,
    contrast: number,
}

type DepthProcessLayer = {
    type: "Depth",
    inverted: boolean,
}

type ColorDepthProcessLayer = {
    type: "ColorDepth",
    bits: number,
}

type HueSaturationPostProcessLayer = {
    type: "HueSaturation",
    hue: number,
    saturation: number,
}
type ScanlineEffectPostProcessLayer = {
    type: "ScanlineEffect",
    density: number,
}

type SSAOPostProcessLayer = {
    type: "SSAO",
    offset: number,
    darkness: number,
    samples: number,
    rings: number,
    worldDistanceThreshold: number,
    worldDistanceFalloff: number,
    worldProximityThreshold: number,
    worldProximityFalloff: number,
    minRadiusScale: number,
    luminanceInfluence: number,
    radius: number,
    intensity: number,
    bias: number,
    fade: number,
}

type ToneMappingPostProcessLayer = {
    type: "ToneMapping",
    resolution: number,
    whitePoint: number,
    middleGrey: number,
    minLuminance: number,
    averageLuminance: number,
    adaptationRate: number,
}

type LensDistortionPostProcessLayer = {
    type: "LensDistortion",
    distortion: Vector2,
    principalPoint: Vector2,
    focalLength: Vector2,
    skew: number,
}



export type PostProcessLayer =
    BloomPostProcessLayer |
    SepiaPostProcessLayer |
    TiltShiftPostProcessLayer |
    VignettePostProcessLayer |
    BlurPostProcessLayer |
    SSAOPostProcessLayer |
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
    HueSaturationPostProcessLayer
export type PostProcessLayerType = PostProcessLayer["type"];


type PostProcessSetting<TPostProcessLayer extends PostProcessLayer> = {
    default: TPostProcessLayer,
    addEffect: (layer: TPostProcessLayer, composer: EffectComposer, camera: Camera) => void;
}
export const PostProcessLayerUtils: { [TDefinition in PostProcessLayer as TDefinition["type"]]: PostProcessSetting<TDefinition> } = {
    Bloom: {
        default: {
            type: "Bloom",
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
            type: "Blur"
        },
        addEffect: function (layer: BlurPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new KawaseBlurPass({}));
        }
    },
    Vignette: {
        default: {
            type: "Vignette",
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
            type: "Sepia",
            intensity: 1
        },
        addEffect: function (layer: SepiaPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new SepiaEffect({ intensity: layer.intensity })));
        }
    },
    TiltShift: {
        default: {
            type: "TiltShift",
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
            type: "DepthOfField",
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
    SSAO: {
        default: {
            type: "SSAO",
            offset: 0,
            darkness: 0,
            samples: 0,
            rings: 0,
            worldDistanceThreshold: 0,
            worldDistanceFalloff: 0,
            worldProximityThreshold: 0,
            worldProximityFalloff: 0,
            minRadiusScale: 0,
            luminanceInfluence: 0,
            radius: 0,
            intensity: 0,
            bias: 0,
            fade: 0
        },
        addEffect: function (layer: SSAOPostProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new KawaseBlurPass({}));
        }
    },
    Bokeh: {
        default: {
            type: "Bokeh",
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
            type: "BrightnessContrast",
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
            type: "ChromaticAberration",
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
            type: "ColorAverage",
        },
        addEffect: function (layer: ColorAverageProcessLayer, composer: EffectComposer, camera: Camera): void {
            composer.addPass(new EffectPass(camera, new ColorAverageEffect()));
        }
    },
    Depth: {
        default: {
            type: "Depth",
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
            type: "ColorDepth",
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
            type: "HueSaturation",
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
            type: "ScanlineEffect",
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
            type: "ToneMapping",
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
            type: "LensDistortion",
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
    }
}


export function createPostProcessLayer(type: PostProcessLayerType = "Bloom"): PostProcessLayer {
    var data = PostProcessLayerUtils[type];
    return structuredClone(data.default);
}