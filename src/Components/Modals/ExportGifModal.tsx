import { useTree } from "../../Hooks/useTree";
import { TreeStore } from "../../Types/TreeStore";
import { Modal } from "../Modal";
import styled from "styled-components";
import { IconGif } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NumberInput } from "../Settings/NumberInput";
import { useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { ExecutionContext, createExecutionContext } from "../../Utils/createExecutionContext";
import { START_NODE } from "../../Nodes/System/StartNode";
import { CanvasExporter } from "./Exporters/CanvasExporter";
import { WhammyExporter } from "./Exporters/WhammyExporter";
import { BoolInput } from "../Settings/BoolInput";
import { GifExporter } from "./Exporters/GifExporter";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;
  overflow: auto;

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
  isGif: boolean;
  preloadDuration: number;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;
  var context: ExecutionContext = createExecutionContext(tree, p5 as P5CanvasInstance);
  var ended = false;
  var renderer: CanvasExporter | null = null;
  var ownProps: MySketchProps | null = null;
  let seed = Date.now();

  p5.setup = () => {};

  p5.updateWithProps = (props: MySketchProps) => {
    if (tree !== props.tree || ended) {
      tree = props.tree;
      context = createExecutionContext(tree, p5 as P5CanvasInstance);
      ownProps = props;
      const start = tree.getNode(START_NODE);

      if (renderer == null) {
        p5.pixelDensity(1);
        p5.createCanvas(start.settings.width || 400, start.settings.height || 400);
        const frameRate = Math.floor(1000 / ownProps.fixedFrameRate);
        renderer = props.isGif ? GifExporter() : WhammyExporter();
        renderer.init(start.settings.width || 400, start.settings.height || 400, frameRate, ownProps.onFinished, ownProps.onProgress);
        ended = false;
      }
    }
  };

  var time = 0;
  p5.draw = () => {
    if (!ownProps) {
      return;
    }
    const frameRate = Math.floor(1000 / ownProps.fixedFrameRate);
    context.time = time;
    context.deltaTime = frameRate;
    var progress = Math.max(0, time - ownProps.preloadDuration * 1000) / (ownProps.duration * 1000);
    context.p5.randomSeed(seed);
    context.frameBlackboard = {};
    context.execute(START_NODE);
    if (Object.values(context.blackboard).some((blackboardItem: any) => blackboardItem !== undefined && blackboardItem.isLoaded !== undefined && !blackboardItem.isLoaded)) {
    } else if (!ended) {
      time += frameRate;
      console.log(time - ownProps.preloadDuration * 1000 >= 0);
      if (time - ownProps.preloadDuration * 1000 >= 0) {
        renderer?.addFrame(p5.drawingContext);
      }

      ownProps.onProgress(progress, 0);

      if (progress >= 1) {
        ended = true;
        renderer?.render();
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
  const [preloadDuration, setPreloadDuration] = useState(0);
  const [renderState, setRenderState] = useState<"waiting" | "rendering" | "processing" | "done">("waiting");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);
  const [isGif, setIsGif] = useState(true);

  const start = tree.getNode(START_NODE);

  const onProgress = (rendering: number, processing: number) => {
    setProgress((rendering * 0.5 + processing * 0.5) * 100);
    if (rendering >= 1 && renderState === "rendering") {
      setRenderState("processing");
    }
  };
  const filename = isGif ? `nodepainter-vid-${Date.now()}.gif` : `nodepainter-vid-${Date.now()}.webm`;

  return (
    <Modal onClose={close} title="Export a gif" icon={IconGif}>
      <MainDiv>
        <fieldset>
          <label>Duration, in second {fixedFrameRate > 0 ? `(${Math.floor(duration * fixedFrameRate)} frames)` : ``}</label>
          <NumberInput value={duration} onChange={setDuration} />
        </fieldset>
        <fieldset>
          <label>FrameRate</label>
          <NumberInput value={fixedFrameRate} onChange={setFixedFrameRate} />
        </fieldset>
        <fieldset>
          <label>Preload</label>
          <NumberInput value={preloadDuration} onChange={setPreloadDuration} />
        </fieldset>
        <fieldset>
          <label>Output as a gif ?</label>
          <BoolInput value={isGif} onChange={setIsGif} />
        </fieldset>
        <hr></hr>
        <progress value={progress} max="100" />
        <ButtonGroup>
          {renderState === "waiting" && <button onClick={() => setRenderState("rendering")}> Render</button>}
          {renderState === "rendering" && <button disabled> Rendering</button>}
          {renderState === "processing" && <button disabled> Processing</button>}
          {renderState === "done" && <button onClick={() => download(blob as Blob, filename)}>Download</button>}
        </ButtonGroup>
      </MainDiv>
      <div>
        {renderState === "rendering" && (
          <ReactP5Wrapper
            key={`${start.settings.width} / ${start.settings.height}`}
            sketch={sketch}
            tree={tree}
            duration={duration}
            fixedFrameRate={fixedFrameRate}
            preloadDuration={preloadDuration}
            isGif={isGif}
            onFinished={(blob: Blob) => {
              setRenderState("waiting");
              setProgress(100);
              setBlob(blob);
              download(blob as Blob, filename);
            }}
            onProgress={onProgress}
          />
        )}
      </div>
    </Modal>
  );
}
