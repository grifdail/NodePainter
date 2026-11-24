import { IconPhoto } from "@tabler/icons-react";
import { Graphics, Shader } from "p5";
import { SettingGenerator } from "../../../Components/Settings/SettingGenerator";
import { ImageData } from "../../../Types/ImageData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createColor } from "../../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { computeResolution } from "../../../Utils/graph/execution/computeResolution";
import { White } from "../../../Utils/math/colorUtils";


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

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  vec4 v1 = mix(color1, color2, uv.x);
  vec4 v2 = mix(color4, color3, uv.x);

  gl_FragColor = mix(v1,v2,uv.y);
}
`;

export const Generate4PointGradientImage: NodeDefinition = {
    id: "Image/Generate/4PointGradient",
    label: "Generate 4 Point Gradient Image",
    description: "Create an image of a 4 points gradients",
    icon: IconPhoto,
    dataInputs: [
        Port.color("color1", White()),
        Port.color("color2", createColor(1, 0, 0)),
        Port.color("color3", createColor(0, 1, 0)),
        Port.color("color4", createColor(0, 0, 1)),
        Port.CacheId()
    ],
    dataOutputs: [{ id: "output", type: "image", defaultValue: null }],
    tags: ["Image", "Color"],
    settings: [
        SettingGenerator.resolution("resolution", { mode: "original" })
    ],
    getData(portId, node, context) {
        var resolution = computeResolution(context, context.getSetting(node, "resolution"));
        var color1 = context.getInputValueColor(node, "color1");
        var color2 = context.getInputValueColor(node, "color2");
        var color3 = context.getInputValueColor(node, "color3");
        var color4 = context.getInputValueColor(node, "color4");

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

        shader.setUniform("color1", color1);
        shader.setUniform("color2", color2);
        shader.setUniform("color3", color3);
        shader.setUniform("color4", color4);
        ctx.fill("purple");
        ctx.noStroke();
        ctx.rect(0, 0, resolution.width, resolution.height);
        //console.log(ctx);
        return img;
    },
};
