import { camelCaseToWords } from "./camelCaseToWords";

export function idToNodeName(id: string) {
  return camelCaseToWords(id.replaceAll(/.+\//gi, ""));
}
