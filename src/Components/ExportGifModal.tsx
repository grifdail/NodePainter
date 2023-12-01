import { TreeStore, useTree } from "../Hooks/useTree";
import { Modal } from "./Modal";
import styled from "styled-components";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ButtonGroup } from "./StyledComponents/ButtonGroup";
import { NumberInput } from "./PortColor";
import { useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { ExecutionContext } from "../Data/NodeDefinition";
import { createExecutionContext } from "./SketchPreview";
import * as GIF from "gif.js.optimized";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;

  & textarea {
    flex: 1 0 100px;
  }
`;

type MySketchProps = SketchProps & {
  tree: TreeStore;
  onFinished: (blob: Blob) => void;
  onEndRendering: () => void;
  duration: number;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;
  var context: ExecutionContext = createExecutionContext(tree, p5 as P5CanvasInstance);
  var ended = false;
  var gif: any = null;
  var ownProps: MySketchProps | null = null;

  p5.setup = () => {
    p5.createCanvas(400, 400);
  };

  p5.updateWithProps = (props: MySketchProps) => {
    tree = props.tree;
    context = createExecutionContext(tree, p5 as P5CanvasInstance);
    gif = new GIF({
      workerScript: "/gif.worker.js",
      workers: 8,
      quality: 5,
      width: 400,
      height: 400,
      debug: true,
    });
    gif.on("finished", function (blob: Blob) {
      props.onFinished(blob);
    });
    ownProps = props;
    ended = false;
  };

  p5.draw = () => {
    context.execute("start");
    if (!ended && ownProps) {
      gif.addFrame(p5.drawingContext, { delay: p5.deltaTime, copy: true });
      if (p5.millis() > ownProps.duration * 1000) {
        ended = true;
        ownProps.onEndRendering();
        gif.render();
      }
    }
  };
};

function download(blob: Blob, filename: string = "data.json") {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
}

export function ExportGifModal({ close }: { close: () => void }) {
  const tree = useTree();
  const [duration, setDuration] = useState(1);
  const [renderState, setRenderState] = useState<"waiting" | "rendering" | "processing" | "done">("waiting");
  const [blob, setBlob] = useState<Blob | null>(null);

  return (
    <Modal onClose={close} title="Save" icon={IconDeviceFloppy}>
      <MainDiv>
        <div>
          <label>Duration</label>
          <NumberInput value={duration} onChange={setDuration} />
        </div>

        <ButtonGroup>
          {renderState === "waiting" && <button onClick={() => setRenderState("rendering")}> Render</button>}
          {renderState === "rendering" && <button disabled> Rendering</button>}
          {renderState === "processing" && <button disabled> Processing</button>}
          {renderState === "done" && <button onClick={() => download(blob as Blob, `nodepainter-gif-${Date.now()}.gif`)}>Download</button>}
        </ButtonGroup>
      </MainDiv>
      <div hidden>
        {renderState === "rendering" && (
          <ReactP5Wrapper
            sketch={sketch}
            tree={tree}
            duration={duration}
            onFinished={(blob: Blob) => {
              setRenderState("done");
              setBlob(blob);
            }}
            onEndRendering={() => setRenderState("processing")}
          />
        )}
      </div>
    </Modal>
  );
}
