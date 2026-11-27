import { Effect, EffectComposer, Pass } from "postprocessing";
import { Camera, Scene } from "three";
import { NodeDefinition } from "./NodeDefinition";
import { PostProcessLayer } from "./PostProcessLayer";

export type PostProcessNodeDefinition<TPostProcessLayer extends PostProcessLayer, TComponent extends Pass | Effect> = NodeDefinition & {
    add3dPostProcess: (layer: TPostProcessLayer, composer: EffectComposer, camera: Camera, scene: Scene) => (layer: TPostProcessLayer) => void;
}