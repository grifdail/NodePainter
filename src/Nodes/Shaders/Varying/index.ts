import { CameraDirectionNode } from "./ShaderCameraDirection";
import { CameraPositionNode } from "./ShaderCameraPosition";
import { LocalNormalNode } from "./ShaderLocalNormal";
import { LocalPositionNode } from "./ShaderLocalPosition";
import { UVNode } from "./ShaderUV";
import { ViewDirectionNode } from "./ShaderViewDirection";
import { ViewNormalNode } from "./ShaderViewNormal";
import { ViewPositionNode } from "./ShaderViewPosition";
import { WorldNormalNode } from "./ShaderWorldNormal";
import { WorldPositionNode } from "./WorldPositionNode";

export const ShaderVaryingNodes = [
  // All nodes
  LocalNormalNode,
  ViewNormalNode,
  WorldNormalNode,

  LocalPositionNode,
  ViewPositionNode,
  WorldPositionNode,

  UVNode,

  CameraPositionNode,
  CameraDirectionNode,
  ViewDirectionNode,
];
