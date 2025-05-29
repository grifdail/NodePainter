export function convertToShaderNumber(value: any) {
  var str: string = Number.isNaN(value) ? "0.0" : value.toString();
  if (str.indexOf(".") < 0) {
    return `${str}.0`;
  } else {
    return str;
  }
}
