import { TreeStore, useTree } from "../Hooks/useTree";
import { Modal } from "./Modal";
import styled from "styled-components";
import { IconGif } from "@tabler/icons-react";
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

  & fieldset {
    display: flex;
    flex-direction: row;
    border: none;
    justify-content: space-between;
  }
  & hr {
    flex-grow: 1;
    border: none;
  }
  & progress {
    display: block;
    width: calc(100% - 20px);
    margin: 10px;
    height: 50px;
    border: none;
    background: rgba(0, 0, 0, 0.2);
  }
`;

type MySketchProps = SketchProps & {
  tree: TreeStore;
  onFinished: (blob: Blob) => void;
  onProgress: (rendering: number, processing: number) => void;
  duration: number;
  fixedFrameRate: number;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;
  var context: ExecutionContext = createExecutionContext(tree, p5 as P5CanvasInstance);
  var ended = false;
  var gif: any = null;
  var ownProps: MySketchProps | null = null;

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.createCanvas(400, 400);
    gif = new GIF({
      workerScript: "/gif.worker.js",
      workers: 8,
      quality: 5,
      width: 400,
      height: 400,
      debug: true,
    });
    gif.on("finished", function (blob: Blob) {
      ownProps?.onFinished(blob);
    });
    gif.on("progress", function (p: any) {
      ownProps?.onProgress(1, p);
    });
    ended = false;
  };

  p5.updateWithProps = (props: MySketchProps) => {
    tree = props.tree;
    context = createExecutionContext(tree, p5 as P5CanvasInstance);

    ownProps = props;
  };

  var time = 0;
  p5.draw = () => {
    context.execute("start");
    if (!ended && ownProps) {
      time += ownProps.fixedFrameRate > 0 ? 1000 / ownProps.fixedFrameRate : p5.deltaTime;
      context.time = time;
      gif.addFrame(p5.drawingContext, { delay: ownProps.fixedFrameRate > 0 ? 1000 / ownProps.fixedFrameRate : p5.deltaTime, copy: true });
      var progress = time / (ownProps.duration * 1000);
      ownProps.onProgress(progress, 0);
      if (progress >= 1) {
        ended = true;
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
  const [fixedFrameRate, setFixedFrameRate] = useState(32);
  const [renderState, setRenderState] = useState<"waiting" | "rendering" | "processing" | "done">("waiting");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);

  const onProgress = (rendering: number, processing: number) => {
    setProgress((rendering * 0.5 + processing * 0.5) * 100);
    if (rendering >= 1 && renderState === "rendering") {
      setRenderState("processing");
    }
  };

  return (
    <Modal onClose={close} title="Export a gif" icon={IconGif}>
      <MainDiv>
        <fieldset>
          <label>Duration, in second {fixedFrameRate > 0 ? `(${Math.floor(duration * fixedFrameRate)} frames)` : ``}</label>
          <NumberInput value={duration} onChange={setDuration} />
        </fieldset>
        <fieldset>
          <label>FrameRate (keep at 0 for dynamic frame rate)</label>
          <NumberInput value={fixedFrameRate} onChange={setFixedFrameRate} />
        </fieldset>
        <hr></hr>
        <progress value={progress} max="100" />
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
            fixedFrameRate={fixedFrameRate}
            onFinished={(blob: Blob) => {
              setRenderState("done");
              setBlob(blob);
            }}
            onProgress={onProgress}
          />
        )}
      </div>
    </Modal>
  );
}
