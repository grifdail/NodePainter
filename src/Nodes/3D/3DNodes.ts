import { BillBoardNode } from "./BillboardNode";
import { CameraNodes } from "./Camera";
import { GeometryNodes } from "./Geometries/Index";
import { ParametricGeometryNode } from "./Geometries/ParametricGeometryNode";
import { ShapeGeometryNode } from "./Geometries/ShapeGeometryNode";
import { LightNodes } from "./Lights";
import { MaterialNodes } from "./Materials";
import { PostProcess3DNodes } from "./PostProcess";
import { Render3D } from "./Render3D";
import { Render3DLine } from "./Render3DLine";
import { RenderModel } from "./RenderModel";
import { Transform3D } from "./Transform3D";
import { UploadModel } from "./UploadModel";


export const Nodes3D = [
    ...LightNodes,
    ...MaterialNodes,
    ...GeometryNodes,
    ...CameraNodes,
    ...PostProcess3DNodes,
    Render3D,
    UploadModel,
    //GenerateUVModel,
    RenderModel,
    Render3DLine,
    Transform3D,
    ParametricGeometryNode,
    ShapeGeometryNode,
    BillBoardNode
];
