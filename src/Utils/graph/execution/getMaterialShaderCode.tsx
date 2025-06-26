import { NodeCollection } from "../../../Types/NodeCollection";
import { PortConnection } from "../../../Types/PortConnection";
import { TreeStore } from "../../../Types/TreeStore";
import { ExecutionContext } from "./createExecutionContext";
import { buildDependencyList, buildRequirement, buildCode, getShaderType } from "./getShaderCode";
import { sanitizeForShader } from "./sanitizeForShader";

export function getMaterialShaderCode(shader: string, ports: PortConnection[], tree: TreeStore | null, context: ExecutionContext) {
  const flattenNode = buildDependencyList(`${shader}-end`, tree?.nodes as NodeCollection);
  const requirement = buildRequirement(flattenNode, tree);
  const code = buildCode(flattenNode, tree, context);

  const vertex = `
  #include <common>
  
  varying vec2 vUv;
  varying vec4 vWorldPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform float time;

  void main() {
      vUv =  uv;
      vWorldPosition = modelMatrix * vec4( position, 1.0 );
      vec4 mvPosition = viewMatrix * vWorldPosition;
      vec3 worldNormal = normalize ( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
      vNormal = normalize( normalMatrix * normal );
      vViewPosition = mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
  }`;

  const frag = `
  #include <common>
  
  varying vec2 vUv;
  varying vec4 vWorldPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform float time;
  
  ${ports.map((port) => `uniform ${getShaderType(port.type)} ${sanitizeForShader(`uniform_${port.id}`)};`).join("\n")}

  ${requirement.join("\n\n")}

  void main() {
    ${code.join("\n")}
  }`;
  console.log(frag);
  return { frag, vertex };
}
