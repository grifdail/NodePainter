import { ShaderCameraDirection } from "./ShaderCameraDirection";
import { ShaderCameraPosition } from "./ShaderCameraPosition";
import { ShaderLocalNormal } from "./ShaderLocalNormal";
import { ShaderLocalPosition } from "./ShaderLocalPosition";
import { ShaderUV } from "./ShaderUV";
import { ShaderViewDirection } from "./ShaderViewDirection";
import { ShaderViewNormal } from "./ShaderViewNormal";
import { ShaderViewPosition } from "./ShaderViewPosition";
import { ShaderWorldNormal } from "./ShaderWorldNormal";
import { ShaderWorldPosition } from "./ShaderWorldPosition";

export const ShaderVaryingNodes = [
  // All nodes
  ShaderLocalNormal,
  ShaderViewNormal,
  ShaderWorldNormal,

  ShaderLocalPosition,
  ShaderViewPosition,
  ShaderWorldPosition,

  ShaderUV,

  ShaderCameraPosition,
  ShaderCameraDirection,
  ShaderViewDirection,
];
