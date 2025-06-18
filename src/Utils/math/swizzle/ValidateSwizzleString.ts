import { SwizzleOperations } from "./SwizzleOperations";

export function validateSwizzleString(text: string, count: number = 3) {
  text = text.trim();
  text = text.toLowerCase();
  var regex = new RegExp(`[^${Object.keys(SwizzleOperations).join()}]`, "gi");
  text = text.replaceAll(regex, "");
  if (text.length > 4) {
    text = text.slice(0, 4);
  }
  return text + (text.length < count ? "xyzw".slice(text.length, count) : "");
}
