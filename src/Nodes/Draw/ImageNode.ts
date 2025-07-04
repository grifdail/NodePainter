import { IconAdjustmentsPlus, IconPhoto } from "@tabler/icons-react";
import { Image } from "p5";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../Types/vectorDataType";
import { createPortConnection } from "../../Utils/graph/modification/createPortConnection";
import { toP5Color, White } from "../../Utils/math/colorUtils";

export const ImageNode: NodeDefinition = {
  id: "Draw/Image",
  label: "Draw Image",
  icon: IconPhoto,
  description: "Draw an image",
  dataInputs: [
    //
    Port.image("image"),
    Port.vector2("pos"),
    Port.vector2("dim", createVector2(400, 400)),
    Port.color("tint", White()),

    /*
    Port.vector2("sourcePos", createVector2(0, 0)),
    Port.vector2("sourceDim", createVector2(-1, -1)),*/
  ],
  dataOutputs: [Port.drawing2d("out")],
  tags: ["Image"],

  settings: [
    {
      id: "smooth",
      type: "bool",
      defaultValue: true,
    },
    {
      id: "centered",
      type: "bool",
      defaultValue: false,
    },
    {
      id: "button",
      type: "button",
      button: {
        label: "Use Advanced Option",
        icon: IconAdjustmentsPlus,
        onClick: function (node: NodeData): void {
          console.log(node.dataInputs.sourcePos);
          if (!node.dataInputs.sourcePos) {
            node.dataInputs.sourcePos = createPortConnection(Port.vector2("sourcePos", createVector2(0, 0)));
            node.dataInputs.sourceDim = createPortConnection(Port.vector2("sourceDim", createVector2(100, 100)));
          }
        },
        hide(node) {
          return !!node.dataInputs.sourcePos;
        },
      },
    },
  ],
  getData(portId, node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector2(node, "pos");
    var dim = context.getInputValueVector2(node, "dim");
    var tint = context.getInputValueColor(node, "tint");
    const source: SourceData = node.dataInputs.sourcePos
      ? {
          //
          has: true,
          pos: context.getInputValueVector2(node, "sourcePos"),
          dim: context.getInputValueVector2(node, "sourceDim"),
        }
      : { has: false };
    const offset = node.settings.centered ? [-dim[0] * 0.5, -dim[1] * 0.5] : [0, 0];
    return () => {
      if (image && image.getP5(context.p5)) {
        if (!node.settings.smooth) {
          context.target.noSmooth();
        }
        if (tint !== White()) {
          context.target.tint(toP5Color(tint, context.p5));
        }
        if (source.has) {
          context.target.image(
            //
            image.getP5(context.p5) as Image,
            pos[0] + offset[0],
            pos[1] + offset[1],
            dim[0],
            dim[1],
            source.pos[0],
            source.pos[1],
            source.dim[0],
            source.dim[1]
          );
        } else {
          context.target.image(
            //
            image.getP5(context.p5) as Image,
            pos[0] + offset[0],
            pos[1] + offset[1],
            dim[0],
            dim[1]
          );
        }
        context.target.tint(255, 255);
        if (!node.settings.smooth) {
          context.target.smooth();
        }
      }
    };
  },
};

type SourceData = { has: false } | { has: true; pos: Vector2; dim: Vector2 };
