export const sanitizeForShader = function (str: string | null) {
  return str?.replaceAll(/\W/gi, "_").replaceAll("__", "_");
};
