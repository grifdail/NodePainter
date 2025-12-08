import { AreaCommentNode } from "./AreaCommentNode";
import { BlackboardNode } from "./BlackboardNode";
import { CacheNode } from "./CacheNode";
import { MiscCombineNodes } from "./Combine";
import { CommentNode } from "./CommentNode";
import { ImperativeFunctionNode } from "./ImperativeFunctionNode";
import { JavascriptFunctionNode } from "./JavascriptFunctionNode";
import { JSONArrayNode } from "./JSONArrayNode";
import { MetaNode } from "./MetaNode";
import { MiscRenderNodes } from "./Render";
import { ValueNode } from "./ValueNode";

export const MiscNodes = [
  //
  ...MiscCombineNodes,
  ...MiscRenderNodes,
  AreaCommentNode,
  BlackboardNode,
  CacheNode,
  CommentNode,
  ImperativeFunctionNode,
  JavascriptFunctionNode,
  JSONArrayNode,
  MetaNode,
  ValueNode,
];
