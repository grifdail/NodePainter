import { IconPhoto } from "@tabler/icons-react";
import p5 from "p5";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";

const KEY_BLUR_SHADER_H = "BLUR_EFFECT_SHADER_H";
const KEY_BLUR_SHADER_V = "BLUR_EFFECT_SHADER_V";
const KEY_BLOOM_SHADER = "BLOOM_EFFECT_SHADER_V";
const KEY_FIRST_PASS = "BLOOM_EFFECT_FIRST_PASS";
const KEY_SECOND_PASS = "BLOOM_EFFECT_SECOND_PASS";

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

// the size of a texel or 1.0 / width , 1.0 / height
uniform vec2 texelSize;

// which way to blur, vec2(1.0, 0.0) is horizontal, vec2(0.0, 1.0) is vertical
uniform vec2 direction;

// gaussian blur filter modified from Filip S. at intel 
// https://software.intel.com/en-us/blogs/2014/07/15/an-investigation-of-fast-real-time-gpu-based-image-blur-algorithms
// this function takes three parameters, the texture we want to blur, the uvs, and the texelSize
vec3 gaussianBlur( sampler2D t, vec2 texUV, vec2 stepSize ){   
	// a variable for our output                                                                                                                                                                 
	vec3 colOut = vec3( 0.0 );                                                                                                                                   

	// stepCount is 9 because we have 9 items in our array , const means that 9 will never change and is required loops in glsl                                                                                                                                     
	const int stepCount = 9;

	// these weights were pulled from the link above
	float gWeights[stepCount];
	    gWeights[0] = 0.10855;
	    gWeights[1] = 0.13135;
	    gWeights[2] = 0.10406;
	    gWeights[3] = 0.07216;
	    gWeights[4] = 0.04380;
	    gWeights[5] = 0.02328;
	    gWeights[6] = 0.01083;
	    gWeights[7] = 0.00441;
	    gWeights[8] = 0.00157;

	// these offsets were also pulled from the link above
	float gOffsets[stepCount];
	    gOffsets[0] = 0.66293;
	    gOffsets[1] = 2.47904;
	    gOffsets[2] = 4.46232;
	    gOffsets[3] = 6.44568;
	    gOffsets[4] = 8.42917;
	    gOffsets[5] = 10.41281;
	    gOffsets[6] = 12.39664;
	    gOffsets[7] = 14.38070;
	    gOffsets[8] = 16.36501;
	
	// lets loop nine times
	for( int i = 0; i < stepCount; i++ ){  

		// multiply the texel size by the by the offset value                                                                                                                                                               
	    vec2 texCoordOffset = gOffsets[i] * stepSize;

		// sample to the left and to the right of the texture and add them together                                                                                                           
	    vec3 col = texture2D( t, texUV + texCoordOffset ).xyz + texture2D( t, texUV - texCoordOffset ).xyz; 

		// multiply col by the gaussian weight value from the array
		col *= gWeights[i];

		// add it all up
	    colOut +=  col;                                                                                                                               
	}

	// our final value is returned as col out
	return colOut;                                                                                                                                                   
} 


void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // use our blur function
  vec3 blur = gaussianBlur(tex0, uv, texelSize * direction);

  gl_FragColor = vec4(blur, 1.0);
}
`;

const BLOOM_FRAGMENT_SHADER = `
precision mediump float;

// texcoords from the vertex shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

// the mouse value between 0 and 1
uniform float amount;

float invLerp(float from, float to, float value){
  return (value - from) / (to - from);
}

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  //uv = 1.0 - uv;

  // get the camera and the blurred image as textures
  vec4 cam = texture2D(tex0, uv);
  vec4 blur = texture2D(tex1, uv);

  // calculate an average color for the blurred image
  // this is essentially the same as saying (blur.r + blur.g + blur.b) / 3.0;
  float avgBlur = dot(blur.rgb, vec3(0.33333));
  float avgCam = dot(cam.rgb, vec3(0.33333));

  // mix the blur and camera together according to how bright the blurred image is
  // use the mouse to control the bloom
  vec4 bloom = avgBlur>avgCam ? mix(cam, blur, clamp(avgBlur*amount, 0.0, 1.0)) : cam;

  gl_FragColor = bloom;
}
`;

export const BloomEffect: NodeDefinition = {
  id: "Effect/Bloom",
  label: "Apply Bloom Effect",
  icon: IconPhoto,
  description: "Make the bright spot appear brighter",
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "amount", type: "number", defaultValue: 1 },
    { id: "blurAmount", type: "number", defaultValue: 1 },
  ],
  dataOutputs: [{ id: "output", type: "image", defaultValue: null }],
  tags: ["Image"],

  settings: [],
  getData(portId, node, context) {
    var imageData = context.getInputValueImage(node, "image");
    var amount = context.getInputValueNumber(node, "amount");
    var blurAmount = context.getInputValueNumber(node, "blurAmount");
    if (!imageData || !imageData.getP5(context.p5)) {
      return null;
    }
    let image = imageData.getP5Uniform(context.p5) as p5.Graphics;
    let shaderBlurH = createShaderFromCache(context, KEY_BLUR_SHADER_H, EFFECT_VERTEX_SHADER, BLUR_FRAGMENT_SHADER);
    let shaderBlurV = createShaderFromCache(context, KEY_BLUR_SHADER_V, EFFECT_VERTEX_SHADER, BLUR_FRAGMENT_SHADER);
    let shaderBloom = createShaderFromCache(context, KEY_BLOOM_SHADER, EFFECT_VERTEX_SHADER, BLOOM_FRAGMENT_SHADER);
    const keyCache = `${node.id}-image-cache`;
    let firstPass = getPassBuffer(context, KEY_FIRST_PASS, image);
    let secondPass = getPassBuffer(context, KEY_SECOND_PASS, image);
    let target = getPassBuffer(context, keyCache, image);

    let firstPassImage = firstPass.getP5() as p5.Graphics;
    let secondPassImage = secondPass.getP5() as p5.Graphics;
    let targetPassImage = target.getP5() as p5.Graphics;
    if (firstPassImage == null || secondPassImage == null || targetPassImage == null || image == null) {
      return;
    }

    shaderBlurH.setUniform("tex0", image);
    shaderBlurH.setUniform("texelSize", [blurAmount / image.width, blurAmount / image.height]);
    shaderBlurH.setUniform("direction", [1.0, 0.0]);

    firstPassImage.shader(shaderBlurH);
    firstPassImage.rect(0, 0, image.width, image.height);

    shaderBlurV.setUniform("tex0", firstPassImage);
    shaderBlurV.setUniform("texelSize", [blurAmount / image.width, blurAmount / image.height]);
    shaderBlurV.setUniform("direction", [0.0, 1.0]);

    secondPassImage.shader(shaderBlurV);
    secondPassImage.rect(0, 0, image.width, image.height);

    shaderBloom.setUniform("tex0", image);
    shaderBloom.setUniform("tex1", secondPassImage);
    shaderBloom.setUniform("amount", amount);

    targetPassImage.shader(shaderBloom);
    targetPassImage.rect(0, 0, image.width / 5, image.height / 5);
    console.log(blurAmount, amount, blurAmount / image.width);
    return target;
  },
};
function createShaderFromCache(context: ExecutionContext, key: string, vertex: string, frag: string) {
  let shader = context.blackboard[key] as p5.Shader;
  if (!shader) {
    shader = context.p5.createShader(vertex, frag);
    context.blackboard[key] = shader;
  }
  return shader;
}

function getPassBuffer(context: ExecutionContext, key: string, image: { width: number; height: number }) {
  let target = context.blackboard[key];
  if (!target) {
    target = new ImageData({ p5Graphics: context.p5.createGraphics(image.width, image.height, context.p5.WEBGL) });
    context.blackboard[key] = target;
  }
  return target;
}
