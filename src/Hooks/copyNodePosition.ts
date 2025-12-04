import { NodeData } from "../Types/NodeData";


export function copyNodePosition(source: NodeData, target: NodeData) {
    if (source) {

        target.positionX = source.positionX;
        target.positionY = source.positionY;
    }
}
