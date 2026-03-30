import { useState } from "react";

export type ContextMenuProps = {
    onContextMenu: (e: any) => void;
    anchorPoint: {
        x: number;
        y: number;
    };
    state: "open" | "closed";
    onClose: () => void;
};


export function useContextMenu(): ContextMenuProps {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    const onContextMenu = (e: any) => {
        if (typeof document.hasFocus === "function" && !document.hasFocus()) return;
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setOpen(true);
    };
    return { onContextMenu, anchorPoint, state: isOpen ? "open" : "closed", onClose: () => setOpen(false) };
}
