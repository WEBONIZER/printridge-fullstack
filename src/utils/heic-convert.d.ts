declare module 'heic-convert' {
  interface ConvertOptions {
    buffer: Buffer;
    format: 'JPEG' | 'PNG';
    quality?: number;
  }

  type ConvertFunction = (options: ConvertOptions) => Promise<Buffer>;

  const heicConvert: ConvertFunction;

  export default heicConvert;
}
