import { IconPackageExport } from "@tabler/icons-react";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";


type GltfCache = {
    loader: GLTFLoader;
    scene: Group | null;
};

export const UploadModel: NodeDefinition = {
    id: "UploadModel",
    label: "Upload Model",
    icon: IconPackageExport,
    description: "Upload a 3d Model",
    dataInputs: [
        Port.vector3("position"),
        Port.vector3("dimension", createVector3(1, 1, 1)),
        Port.quaternion("rotation"),
        Port.CacheId(),
    ],
    dataOutputs: [Port.object3d("out")],
    tags: ["3D"],

    settings: [{ id: "model", type: "mesh-upload" }],
    getData(portId, node, context) {
        if (node.settings.model != null) {
            const rotation = context.getInputValueQuaternion(node, "rotation");
            const position = context.getInputValueVector3(node, "position");
            const dimension = context.getInputValueVector3(node, "dimension");

            const model = readFromCacheWithVersion<GltfCache>(context, node, (previous) => {
                const loader = new GLTFLoader();
                const target: GltfCache = {
                    loader,
                    scene: null,
                }
                loader.parse(
                    node.settings.model.source,
                    "./",
                    (gltf) => {
                        target.scene = gltf.scene;
                    },
                    (err) => console.log(err)
                );
                return target

            });
            if (model.scene) {
                model.scene.position.set(...position);
                model.scene.quaternion.set(...rotation);
                model.scene.scale.set(...dimension);
                return model.scene
            }
            return null;

        }

        return;
    },
};
