import { CreateImageLibraryNode } from "./CreateImageLibrary";
import { FlipbookNode } from "./FlipbookNode";
import { ImageDimension } from "./ImageDimension";
import { PaintImage } from "./PaintImage";
import { PrecomputeImage } from "./PrecomputeImage";
import { SampleImageNode } from "./SampleImageNode";
import { UploadImage } from "./UploadImage";

import galleryMatcap from "../../Data/matcap.json";
import galleryNoise from "../../Data/noises.json";
import galleryParticle from "../../Data/particles.json";
import galleryPattern from "../../Data/patterns.json";
import { GenerateImageNodes } from "./Generator";

export const ImageNodes = [
    //
    FlipbookNode,
    ImageDimension,
    PaintImage,
    PrecomputeImage,
    SampleImageNode,
    UploadImage,

    CreateImageLibraryNode("Particle", galleryParticle),
    CreateImageLibraryNode("Noise", galleryNoise),
    CreateImageLibraryNode("Pattern", galleryPattern),
    CreateImageLibraryNode("Matcap", galleryMatcap),

    ...GenerateImageNodes,
];
