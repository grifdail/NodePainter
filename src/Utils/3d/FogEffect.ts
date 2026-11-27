import { Effect, EffectAttribute } from "postprocessing";
import { Uniform, Vector4 } from "three";
import fragmentShader from "./fogEffect.frag?raw";

export class FogEffect extends Effect {

    constructor({
        minRange, maxRange, colorStart, colorEnd
    }: {
        minRange: number,
        maxRange: number,
        colorStart: Vector4,
        colorEnd: Vector4
    }) {

        super("FogEffect", fragmentShader, {
            attributes: EffectAttribute.DEPTH,
            uniforms: new Map([
                ["minRange", new Uniform(minRange)],
                ["maxRange", new Uniform(maxRange)],
                ["colorStart", new Uniform(colorStart)],
                ["colorEnd", new Uniform(colorEnd)],
            ] as any)
        });

    }

    public set minRange(v: number) {
        var u = this.uniforms.get("minRange");
        if (u) {
            u.value = v;
        }
    }
    public set maxRange(v: number) {
        var u = this.uniforms.get("maxRange");
        if (u) {
            u.value = v;
        }
    }
    public set colorStart(v: Vector4) {
        var u = this.uniforms.get("colorStart");
        if (u) {
            u.value = v;
        }
    }
    public set colorEnd(v: Vector4) {
        var u = this.uniforms.get("colorEnd");
        if (u) {
            u.value = v;
        }
    }

}