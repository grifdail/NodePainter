import { useEffect } from "react";
import { useViewbox } from "../../Hooks/useViewbox";
import { copySelection, cutSelection, parsePastedValue } from "./SnippetSubMenu";

export function useCopyPasteGraph() {
  useEffectCopy();
  useEffectPaste();
  useEffectCut();
}

function useEffectCopy() {
  function handler(event: ClipboardEvent) {
    if (event.target && "tagName" in event.target && (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA")) {
      return;
    }
    copySelection();
  }
  useEffect(() => {
    window.addEventListener("copy", handler as any);
    return () => window.removeEventListener("copy", handler as any);
  }, [handler]);
}

function useEffectPaste() {
  function handler(event: ClipboardEvent) {
    if (event.target && "tagName" in event.target && (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA")) {
      return;
    }
    if (event.clipboardData?.types.includes("text/plain")) {
      const data = event.clipboardData?.getData("text/plain");
      parsePastedValue(data, useViewbox.getState().center());
    }
  }
  useEffect(() => {
    window.addEventListener("paste", handler as any);
    return () => window.removeEventListener("paste", handler as any);
  }, [handler]);
}

function useEffectCut() {
  function handler(event: ClipboardEvent) {
    if (event.target && "tagName" in event.target && (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA")) {
      return;
    }
    cutSelection();
  }
  useEffect(() => {
    window.addEventListener("cut", handler as any);
    return () => window.removeEventListener("cut", handler as any);
  }, [handler]);
}
