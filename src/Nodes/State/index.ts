import { ChangeNode } from "./ChangeNode";
import { Counter } from "./CounterNode";
import { DetectChangeNode } from "./DetectChangeNode";
import { DetectThreshold } from "./DetectThresholdNode";
import { EdgeNode } from "./EdgeNode";
import { PreviousNode } from "./PreviousNode";
import { SaveNode } from "./SaveNode";
import { ToggleFlipFlopNode } from "./ToggleFlipFlopSwitch";
import { ToggleSwitchNode } from "./ToggleSwitch";

export const StateNodes = [
  //
  ChangeNode,
  Counter,
  DetectChangeNode,
  DetectThreshold,
  EdgeNode,
  PreviousNode,
  SaveNode,
  ToggleSwitchNode,
  ToggleFlipFlopNode,
];
