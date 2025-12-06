import p5 from "p5";
import Rand from "rand-seed";
import { SketchSave } from "../Types/SketchTemplate";
import { createExecutionContext, ExecutionContext } from "../Utils/graph/execution/createExecutionContext";
import { getNodeStart, getSketchAuthor, getSketchName } from "../Utils/graph/execution/getNode";
import { upgradeTemplate } from "../Utils/graph/modification/upgradeTemplate";

import "./preview.css";


window.addEventListener("load", async () => {

    setLoading()

    var search = new URLSearchParams(window.location.search);

    if (search.has("iframe")) {
        document.body.classList.add("iframe")
    }
    if (search.has("dark")) {
        document.body.classList.add("dark")
    }

    if (search.has("light")) {
        document.body.classList.add("light")
    }
    if (search.has("color")) {
        document.body.style.backgroundColor = search.get("color") || ""
    }

    try {
        if (search.has("load")) {
            await loadFromUrl(search.get("load"));
            return setPlay();
        } else {
            setError()
        }
    } catch (err) {
        console.error(err)
        setError()
    }


})


function setLoading() {
    (document.querySelector("#loading") as HTMLElement).hidden = false;
    (document.querySelector("header") as HTMLElement).hidden = true;
    (document.querySelector("#canvas-parent") as HTMLElement).hidden = true;
    (document.querySelector("#error") as HTMLElement).hidden = true;
}

function setPlay() {
    (document.querySelector("#loading") as HTMLElement).hidden = true;
    (document.querySelector("header") as HTMLElement).hidden = false;
    (document.querySelector("#canvas-parent") as HTMLElement).hidden = false;
    (document.querySelector("#error") as HTMLElement).hidden = true;
}

function setError() {
    (document.querySelector("#loading") as HTMLElement).hidden = true;
    (document.querySelector("header") as HTMLElement).hidden = true;
    (document.querySelector("#canvas-parent") as HTMLElement).hidden = true;
    (document.querySelector("#error") as HTMLElement).hidden = false;
}

function updateHeader(name: string, author: string | undefined) {
    var header = document.querySelector("header") as HTMLElement;
    (header.querySelector("h1") as HTMLElement).textContent = name;
    (header.querySelector("span") as HTMLElement).textContent = author || "unknown";
    (header.querySelector("p") as HTMLElement).hidden = author === undefined || author?.trim() === "unknown" || author?.trim() === ""
}

async function loadFromUrl(encodedUrl: string | null) {
    if (!encodedUrl) {
        return null;
    }
    var request = await fetch(encodedUrl);
    if (request.ok) {
        var data = (await request.json()) as SketchSave;
        const upgradedData = upgradeTemplate(data);
        updateHeader(getSketchName(upgradedData), getSketchAuthor(data))
        initGame(upgradedData);
    } else {
        throw new Error("No sketch to load")
    }
}

function initGame(tree: SketchSave) {
    var game = new p5((p5) => {

        var context: ExecutionContext = createExecutionContext(tree, p5 as p5);
        var seed = 0;
        var close = () => { };
        p5.setup = () => {
            seed = Date.now();
            var start = getNodeStart(tree);
            p5.createCanvas(start.settings.width || 400, start.settings.height || 400);
            context.RNG = new Rand(seed.toString());
            //Do we need cleanup ?
            //props.setCleanup(context.endOfRunCleanup);
            //TODO: Implement error handling
            //close = props.close;
        };


        p5.draw = () => {
            context.update();
            if (tree) {
                try {
                    var result = context.getInputValue(getNodeStart(tree), "drawing", "drawing2d");
                    if (typeof result === "function") {
                        result();
                    }
                } catch (err: any) {
                    console.error(err);
                }

                context.endOfFrameCleanup();
            };
        }
    }, document.querySelector("#canvas-parent") as HTMLElement)
}


