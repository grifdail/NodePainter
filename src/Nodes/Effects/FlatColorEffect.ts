import { IconPhoto } from "@tabler/icons-react";
import p5 from "p5";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";
import { Black, White } from "../../Utils/math/colorUtils";

const KEY_BLUR_SHADER_H = "BLUR_EFFECT_SHADER_H";
const KEY_BLUR_SHADER_V = "BLUR_EFFECT_SHADER_V";
const KEY_FIRST_PASS = "BLUR_EFFECT_FIRST_PASS";

export const EFFECT_VERTEX_SHADER = `
// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun! 
varying vec2 vTexCoord;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;

const BLUR_FRAGMENT_SHADER = `
precision mediump float;

// texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

// which way to blur, vec2(1.0, 0.0) is horizontal, vec2(0.0, 1.0) is vertical
uniform float threshold;

uniform vec4 colorPositive;
uniform vec4 colorNegative;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  vec4 baseColor = texture2D(tex0, uv ).xyzw; 
  float sum = (baseColor.x + baseColor.y + baseColor.z) / 3.0 * baseColor.w;

  gl_FragColor = sum > threshold ? colorPositive : colorNegative;
}
`;

export const FlatColorEffect: NodeDefinition = {
  id: "FlatColorEffect",
  description: "Apply the same color to all pixel above or below a treshold",
  icon: IconPhoto,
  dataInputs: [{ id: "image", type: "image", defaultValue: null }, Port.number("threshold", 0.5), Port.color("color1", White()), Port.color("color2", Black())],
  dataOutputs: [{ id: "output", type: "image", defaultValue: null }],
  tags: ["Image"],

  settings: [],
  getData(portId, node, context) {
    var imageData = context.getInputValueImage(node, "image");
    var threshold = context.getInputValueNumber(node, "threshold");
    var color1 = context.getInputValueColor(node, "color1");
    var color2 = context.getInputValueColor(node, "color2");
    if (!imageData || !imageData.getP5(context.p5)) {
      return null;
    }
    const keyCache = `${node.id}-image-cache`;
    let image = imageData.getP5(context.p5) as p5.Graphics;
    let shaderV = context.blackboard[keyCache + KEY_BLUR_SHADER_H] as p5.Shader;
    if (!shaderV) {
      shaderV = context.p5.createShader(EFFECT_VERTEX_SHADER, BLUR_FRAGMENT_SHADER);
      context.blackboard[keyCache + KEY_BLUR_SHADER_H] = shaderV;
    }

    let target = getPassBuffer(context, keyCache, image);

    let targetPassImage = target.getP5(context.p5) as p5.Graphics;

    targetPassImage.clear();
    targetPassImage.shader(shaderV);

    shaderV.setUniform("tex0", image);
    shaderV.setUniform("threshold", threshold);
    shaderV.setUniform("colorPositive", color1);
    shaderV.setUniform("colorNegative", color2);

    targetPassImage.rect(0, 0, image.width, image.height);

    return target;
  },
};
function getPassBuffer(context: ExecutionContext, key: string, image: { width: number; height: number }): ImageData {
  let target = context.blackboard[key];
  if (!target) {
    target = new ImageData({ p5Graphics: context.p5.createGraphics(image.width, image.height, context.p5.WEBGL) });
    context.blackboard[key] = target;
  }
  return target;
}

console.log(FlatColorEffect);
