import { useTree } from "../../Hooks/useTree";
import { TreeStore } from "../../Types/TreeStore";
import { Modal } from "../Modal";
import styled from "styled-components";
import { IconGif } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NumberInput } from "../Inputs/NumberInput";
import { useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { ExecutionContext, createExecutionContext } from "../../Utils/createExecutionContext";
import { START_NODE } from "../../Nodes/System/StartNode";
import { CanvasExporter } from "./Exporters/CanvasExporter";
import { WhammyExporter } from "./Exporters/WhammyExporter";
import { BoolInput } from "../Inputs/BoolInput";
import { GifExporter } from "./Exporters/GifExporter";
import { Button } from "../Generics/Button";
import { Fieldset } from "../StyledComponents/Fieldset";
import { CUSTOM_SIMULATION } from "../../Nodes/CustomFunction/CustomSimulation";
import { TextInput } from "../Inputs/TextInput";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  gap: var(--padding-medium);

  & form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: stretch;
    align-self: stretch;
    flex-grow: 1;
    gap: var(--padding-medium);
  }

  & progress {
    display: block;
    width: calc(100% - 20px);
    margin: 10px;
    height: 50px;
    border: none;
    background: rgba(0, 0, 0, 0.2);
  }

  & .rendering {
    text-align: center;
    display: none;
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
  const [duration, setDuration] = useState(tree.globalSettings.progress || 1);
  const hasPreload = Object.values(tree.nodes).some((node) => tree.getNodeTypeDefinition(node).executeAs === CUSTOM_SIMULATION);
  const [fixedFrameRate, setFixedFrameRate] = useState(32);
  const [preloadDuration, setPreloadDuration] = useState(hasPreload ? tree.globalSettings.progress || 0 : 0);
  const [renderState, setRenderState] = useState<"waiting" | "rendering" | "processing" | "done">("waiting");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);
  const [isGif, setIsGif] = useState(true);
  const name = tree.getSketchName();
  const [filename, setFilename] = useState(`${name}-np-${Date.now()}`);

  const start = tree.getNode(START_NODE);

  const onProgress = (rendering: number, processing: number) => {
    setProgress((rendering * 0.5 + processing * 0.5) * 100);
    if (rendering >= 1 && renderState === "rendering") {
      setRenderState("processing");
    }
  };

  const filenameWithExt = `${filename}.${isGif ? "gif" : "webm"}`;

  return (
    <Modal onClose={close} title="Export a gif" icon={IconGif} size="tiny" stretch>
      <MainDiv>
        <form>
          <Fieldset label="Filename" input={TextInput} value={filename} onChange={setFilename} />
          <Fieldset label={`Duration, in second ${fixedFrameRate > 0 ? `(${Math.floor(duration * fixedFrameRate)} frames)` : ``}`} input={NumberInput} value={duration} onChange={setDuration}></Fieldset>
          <Fieldset label="FrameRate" input={NumberInput} value={fixedFrameRate} onChange={setFixedFrameRate} />
          <Fieldset label="Preload" input={NumberInput} value={preloadDuration} onChange={setPreloadDuration} />
          <Fieldset label="Output as a gif ?" input={BoolInput} value={isGif} onChange={setIsGif} />
        </form>

        <hr></hr>
        <div className="rendering">
          {renderState === "rendering" && (
            <ReactP5Wrapper
              key={`${start.settings.width} / ${start.settings.height}`}
              sketch={sketch}
              tree={tree}
              duration={duration}
              fixedFrameRate={fixedFrameRate}
              isGif={isGif}
              preloadDuration={preloadDuration}
              onFinished={(blob: Blob) => {
                setRenderState("waiting");
                setProgress(100);
                setBlob(blob);
                download(blob as Blob, filenameWithExt);
              }}
              onProgress={onProgress}
            />
          )}
        </div>
        <progress value={progress} max="100" />
        <ButtonGroup>
          {renderState === "waiting" && <Button label="Render" onClick={() => setRenderState("rendering")}></Button>}
          {renderState === "rendering" && <Button label="Rendering" disabled></Button>}
          {renderState === "processing" && <Button label="Processing" disabled></Button>}
          {renderState === "done" && <Button label="Download" onClick={() => download(blob as Blob, filenameWithExt)}></Button>}
        </ButtonGroup>
      </MainDiv>
    </Modal>
  );
}
