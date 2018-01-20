export default function downloadFile(file, name, mime) {
  const a = document.createElement('a');
  a.style = 'display: none';
  document.body.appendChild(a);
  const blob = new Blob([file], { type: mime });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}