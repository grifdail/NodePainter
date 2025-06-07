export function download(blob: Blob, filename: string = "data.json") {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
}
