export const sanitizeForShader = function (str: string | null) {
  return str?.replaceAll("-", "_").replaceAll("__", "_");
};
