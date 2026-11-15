import { IconKeyframes } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { interpolateAnimation } from "../../Types/AnimationTrack";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortDefinition } from "../../Types/PortDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { TimelineData } from "../../Utils/timeline/TimelineData";

export const TimelineNode: NodeDefinition = {
    id: "Misc/Timeline",
    description: "Interpolate between keyframe",
    icon: IconKeyframes,
    tags: ["Misc"],
    preventSnippet: false,
    hideInLibrary: false,
    dataInputs: [
        Port.number("progress", 0)
    ],
    dataOutputs: [],
    settings: [
        {
            id: "timeline",
            type: "timeline",
            defaultValue: {},
            onChange(node, newValue, oldValue, definitions) {
                const data = newValue as TimelineData;
                var tree = useTree.getState();
                const newPort = Object.entries(data).map(([trackName, track]) => {
                    const t: PortDefinition = {
                        id: trackName,
                        type: track.type,
                        defaultValue: PortTypeDefinitions[track.type].createDefaultValue()
                    }
                    return t;
                });

                tree.replaceOutput((t) => t.id === node.id, newPort);
            },
        },

    ],
    getData: (portId, node, context) => {
        const t = context.getInputValueNumber(node, "progress") % 1;
        const timeline = context.getSetting(node, "timeline") as TimelineData;


        if (!timeline[portId]) {
            throw new Error(`There's no property named "${portId}" in the animation sequence.`);
        }
        return interpolateAnimation(timeline[portId], t);
    },
};

