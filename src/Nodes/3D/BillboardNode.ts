import { IconBadge3d } from "@tabler/icons-react";
import { Matrix4, Quaternion, Vector3 as TVector3 } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3, Vector3 } from "../../Types/vectorDataType";
import { toQuaternion } from "../../Utils/math/quaternionUtils";
import { CAMERA_3D_TRANSFORM } from "./Render3D";

const m = new Matrix4();

export const BillBoardNode: NodeDefinition = {
    id: "Billboard",
    description: "Return a 3d rotation that always face the camera",
    icon: IconBadge3d,
    tags: ["3D"],
    dataInputs: [
        Port.vector3("position")
    ],
    dataOutputs: [
        {
            id: "rotation",
            type: "quaternion",
            defaultValue: [0, 0, 0, 1],
        },
    ],

    settings: [
        { type: "dropdown", id: "type", defaultValue: "copy-camera", options: ["copy-camera", "y-up", "toward-camera"] }],
    getData(portId, node, context) {
        var position = context.getInputValueVector3(node, "position");
        var setting = node.settings.type;
        if (setting === "copy-camera") {
            return context.blackboard[CAMERA_3D_TRANSFORM]?.rotation
        }
        const camPos = context.blackboard[CAMERA_3D_TRANSFORM]?.position as Vector3 || createVector3();
        if (setting === "y-up") {
            position[1] = camPos[1]
        }
        m.lookAt(new TVector3(...position), new TVector3(...camPos), new TVector3(0, 1, 0));
        var tq = new Quaternion().setFromRotationMatrix(m);
        return toQuaternion(tq);
    },
};