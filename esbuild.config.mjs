import { build } from "esbuild";

build({
  entryPoints: ["src/background-video.js"],
  bundle: true,
  minify: true,
  outfile: "background-video.js",
  target: "es2017",
  format: "iife",
  sourcemap: false,
  banner: {
    js: `/* Lovelace Background Video - Build gerado por esbuild */`,
  },
}).then(() => {
  console.log("✔️  Build concluído com sucesso!");
}).catch(() => process.exit(1));