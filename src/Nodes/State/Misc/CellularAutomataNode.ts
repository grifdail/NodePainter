import { IconPlus, IconStatusChange } from "@tabler/icons-react";
import { SettingGenerator } from "../../../Components/Settings/SettingGenerator";
import { useTree } from "../../../Hooks/useTree";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { ResolutionSettingData } from "../../../Types/ResolutionSettingData";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { computeResolution } from "../../../Utils/graph/execution/computeResolution";
import { trueMod } from "../../../Utils/math/trueMod";


const createIndexNode = ({ id, positionX, positionY, selectedType }: NodeData): void => {
    setTimeout(() => {
        useTree.getState().createBlackboardNode(
            [
                {
                    key: `${id}-pos`,
                    type: "vector2",
                    id: "pos",
                },
                {
                    key: `${id}-index`,
                    type: "number",
                    id: "index",
                },
                {
                    key: `${id}-count`,
                    type: "vector2",
                    id: "size",
                },
                {
                    key: `${id}-previous`,
                    type: selectedType,
                    id: "previous-value",
                },
                {
                    key: `${id}-neighbour`,
                    type: `array-${selectedType}` as PortType,
                    id: "neighbours",
                }
            ],
            "Cellular Automata Index",
            positionX - 400,
            positionY,
            id
        );
    }, 10);
};

export const CellularAutomataNode: NodeDefinition = {
    id: "State/Misc/CellularAutomata",
    label: "Cellular Automate",
    icon: IconStatusChange,
    description: "Run a cellular automaton for a given grid",

    dataInputs: [Port.bool("defaultValue"), Port.bool("nextValue"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port["array-bool"]("out")],
    tags: ["State", "Misc"],
    ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), ["defaultValue", "nextValue"], [], [], ["out"]),
    settings: [
        SettingGenerator.resolution("resolution", { mode: "static", "width": 10, height: 10 }),
        SettingGenerator.dropdown("side", "loop", { options: ["loop", "defaultValue", "ignore"], }),
        {
            id: "buttons",
            type: "button",
            button: {
                label: "Create index node",
                icon: IconPlus,
                onClick: createIndexNode,
            },
        },
    ],
    getData(portId, node, context) {
        const result = readFromCacheWithVersion<any[]>(context, node, (previous) => {
            const resolution = context.getSetting(node, "resolution") as ResolutionSettingData
            const side = context.getSetting(node, "side") as "loop" | "defaultValue" | "ignore"
            const size = computeResolution(context, resolution)
            const defaultValue = PortTypeDefinitions[node.selectedType].createDefaultValue()
            context.blackboard[`${node.id}-count`] = [size.width, size.height];
            context.blackboard[`${node.id}-previous`] = defaultValue;
            context.blackboard[`${node.id}-neighbour`] = [];
            if (!previous) {
                previous = []

                for (let y = 0; y < size.height; y++) {
                    for (let x = 0; x < size.width; x++) {
                        context.blackboard[`${node.id}-index`] = y * size.height + x;
                        context.blackboard[`${node.id}-pos`] = createVector2(x, y);
                        previous[y * size.height + x] = context.getInputValue(node, "defaultValue", node.selectedType);
                    }
                }
                return previous;
            }
            const next = []
            //context.blackboard[`${node.id}-count`] = [size.width, size.height];
            for (let y = 0; y < size.height; y++) {
                for (let x = 0; x < size.width; x++) {

                    const i = y * size.height + x
                    if (side === "ignore" && (x === 0 || y === 0 || x === size.width - 1 || y === size.height - 1)) {
                        next[i] = defaultValue;
                        continue;
                    }
                    context.blackboard[`${node.id}-index`] = i;
                    context.blackboard[`${node.id}-pos`] = createVector2(x, y);
                    context.blackboard[`${node.id}-previous`] = previous[i];
                    context.blackboard[`${node.id}-neighbour`] = [
                        get(x - 1, y - 1, previous, defaultValue),
                        get(x - 0, y - 1, previous, defaultValue),
                        get(x + 1, y - 1, previous, defaultValue),
                        get(x - 1, y - 0, previous, defaultValue),
                        //get(x - 1, y - 1),
                        get(x + 1, y - 0, previous, defaultValue),
                        get(x - 1, y + 1, previous, defaultValue),
                        get(x - 0, y + 1, previous, defaultValue),
                        get(x + 1, y + 1, previous, defaultValue),
                    ];
                    var t = context.getInputValue(node, "nextValue", node.selectedType);
                    next[i] = t;
                }
            }

            return next;


            function get(x: number, y: number, previous: any[], defaultValue: any) {
                if (x < 0 || y < 0 || x >= size.width || y >= size.height) {
                    if (side === "defaultValue") {
                        return defaultValue
                    } else {
                        return get(trueMod(x, size.width), trueMod(y, size.height), previous, defaultValue)
                    }
                }
                return previous[y * size.height + x];

            }
        })

        return result;

    },
};
