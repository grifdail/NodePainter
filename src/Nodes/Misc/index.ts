import { AreaComment } from "./AreaComment";
import { Blackboard } from "./Blackboard";
import { CacheNode } from "./Cache";
import { MiscCombineNodes } from "./Combine";
import { Comment } from "./Comment";
import { CustomImperativeFunction } from "./CustomImperativeFunction";
import { MiscRenderNodes } from "./Render";
import { Value } from "./Value";

export const MiscNodes = [
  //
  ...MiscCombineNodes,
  ...MiscRenderNodes,
  AreaComment,
  Blackboard,
  CacheNode,
  Comment,
  CustomImperativeFunction,
  Value,
];
