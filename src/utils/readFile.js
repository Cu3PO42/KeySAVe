export default function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onabort = reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}