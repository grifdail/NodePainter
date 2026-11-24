import { IconPhoto } from "@tabler/icons-react";
import { Graphics, Shader } from "p5";
import { SettingGenerator } from "../../../Components/Settings/SettingGenerator";
import { ImageData } from "../../../Types/ImageData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { computeResolution } from "../../../Utils/graph/execution/computeResolution";


export const EFFECT_VERTEX_SHADER = `
// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun! 
varying vec2 vTexCoord;
varying vec3 vPos;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  vPos = aPosition;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;

const BLUR_FRAGMENT_SHADER = `
precision mediump float;

// texcoords from the vertex shader
varying vec2 vTexCoord;

uniform vec4 color1;
uniform vec4 color2;
uniform vec4 color3;
uniform vec4 color4;
uniform vec4 color5;
uniform vec4 color6;
uniform vec4 color7;
uniform vec4 color8;
uniform vec4 color9;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  vec4 v1 = mix(mix(color1, color2, uv.x*2.0), mix(color2, color3, uv.x*2.0-1.0), float(uv.x>0.5));
  vec4 v2 = mix(mix(color4, color5, uv.x*2.0), mix(color5, color6, uv.x*2.0-1.0), float(uv.x>0.5));
  vec4 v3 = mix(mix(color7, color8, uv.x*2.0), mix(color8, color9, uv.x*2.0-1.0), float(uv.x>0.5));

  gl_FragColor = mix(mix(v1, v2, uv.y*2.0), mix(v2, v3, uv.y*2.0-1.0), float(uv.y>0.5));;
}
`;

export const Generate9PointGradientImage: NodeDefinition = {
    id: "Image/Generate/9PointGradient",
    label: "Generate 9 Point Gradient Image",
    description: "Create an image of a 9 points gradients",
    icon: IconPhoto,
    dataInputs: [
        Port["array-color"]("colors"),

        Port.CacheId()
    ],
    dataOutputs: [{ id: "output", type: "image", defaultValue: null }],
    tags: ["Image", "Color"],
    settings: [
        SettingGenerator.resolution("resolution", { mode: "original" })
    ],
    getData(portId, node, context) {
        var resolution = computeResolution(context, context.getSetting(node, "resolution"));
        var colors = context.getInputValueVectorArray(node, "colors");

        const data = readFromCacheWithVersion<[ImageData, Shader]>(context, node, (previous) => {
            const img = new ImageData({ p5Graphics: context.p5.createGraphics(resolution.width, resolution.height, context.p5.WEBGL) })
            const ctx = img.getP5CompatibleSource(context.p5) as Graphics;
            const shader = ctx.createShader(EFFECT_VERTEX_SHADER, BLUR_FRAGMENT_SHADER);
            return [img, shader]
        })
        const [img, shader] = data;
        const ctx = img.getP5CompatibleSource(context.p5) as Graphics;

        ctx.clear();
        ctx.shader(shader);
        if (!colors.length) {
            throw new Error("Color array is empty")
        }
        for (var i = 0; i < 9; i++) {
            shader.setUniform(`color${i + 1}`, colors[i % colors.length]);
        }

        ctx.fill("purple");
        ctx.noStroke();
        ctx.rect(0, 0, resolution.width, resolution.height);
        //console.log(ctx);
        return img;
    },
};
