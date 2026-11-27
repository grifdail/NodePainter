import { IconPhoto } from "@tabler/icons-react";
import { ShaderMaterial } from "three";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { createDefaultMaterial } from "../../../Utils/graph/definition/createDefaultMaterial";
import { readFromCacheStatic } from "../../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../../Utils/graph/execution/createExecutionContext";
import { sanitizeForShader } from "../../../Utils/graph/execution/sanitizeForShader";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "../../3D/Materials/createMaterialSetting";

export const ShaderMaterialNode: NodeDefinition = {
    id: "Technical/MaterialShader/Base",
    hideInLibrary: true,
    icon: IconPhoto,
    description: "[WIP] Use a shader to render the material",
    dataInputs: [],
    dataOutputs: [{ id: "material", type: "material", defaultValue: createDefaultMaterial() }],
    tags: ["Shader", "Material"],

    settings: [
        createMaterialSetting(),
    ],

    getData(portId, node, context) {
        const setting = node.settings.material;
        const uniforms = getUniformObject(node.type, context, node);
        const mat = readFromCacheStatic(context, node, "shader", () => {
            const code = context.getMaterialShaderCode(node.type, Object.values(node.dataInputs));
            return new ShaderMaterial({ fragmentShader: code.frag, vertexShader: code.vertex, uniforms: uniforms, ...toThreeSetting(setting) });

        });
        Object.entries(uniforms).forEach(([id, obj]) => {
            mat.uniforms[id].value = (obj as any).value;
        });
        updateTreeMaterial(mat, setting);
        return mat;
    },
};

function getUniformObject(shader: any, context: ExecutionContext, node: NodeData) {
    return {
        time: { value: context.timeMs },
        ...Object.fromEntries(
            Object.values(node.dataInputs).map((port) => {
                const converter = PortTypeDefinitions[port.type].convertToThreeType;
                const value = context.getInputValue(node, port.id, port.type);
                return [sanitizeForShader(`uniform_${port.id}`), { value: converter ? converter(value) : value }];
            })
        ),
    };
}
