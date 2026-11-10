// GitHub Pages için statik çıktı. Alt klasörde yayınlanıyorsa BASE_PATH iş akışı tarafından verilir.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default {
  output: "export",
  basePath: base,
  assetPrefix: base || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};
