import { IconCalendar } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const Calendar: NodeDefinition = {
  id: "Calendar",
  description: "The current date.",
  icon: IconCalendar,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [
    { id: "day", type: "number", defaultValue: 0 },
    { id: "month", type: "number", defaultValue: 0 },
    { id: "year", type: "number", defaultValue: 0 },
    { id: "dayOfTheWeek", type: "number", defaultValue: 0 },
  ],

  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "day") {
      return context.p5.day();
    }
    if (portId === "month") {
      return context.p5.month() % 12;
    }
    if (portId === "year") {
      return context.p5.year();
    }
    if (portId === "dayOfTheWeek") {
      return new Date().getDay();
    }
  },
};
