import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import svgr from "vite-plugin-svgr";
import { terser } from "rollup-plugin-terser";

// import { visualizer } from 'rollup-plugin-visualizer';

// export default defineConfig({
//   plugins: [
//     react(),
//     svgr(),
//     // terser({
//     //   format: {
//     //     comments: false,
//     //     beautify: false,
//     //   },
//     //   compress: {
//     //     passes: 2, // More passes over the code for compression
//     //     drop_console: true, // Remove console statements
//     //     sequences: true, // Join consecutive simple statements using the “comma operator”
//     //   },
//     //   mangle: true, // Shorten variable names
//     // }),
//   ],
//   build: {
//     lib: {
//       entry: resolve(__dirname, "lib/main.tsx"),
//       name: "accessibilik",
//       formats: ["umd"],
//     },
//     rollupOptions: {
//       external: ["react", "react-dom"],
//       output: {
//         // Provide global variables to use in the UMD build
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//       },
//     },
//   },
// });

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    libInjectCss(),
    dts({ include: ["lib"], copyDtsFiles: true }),
    terser({
      format: {
        comments: false,
        beautify: false,
      },
      compress: {
        passes: 2, // More passes over the code for compression
        drop_console: true, // Remove console statements
        sequences: true, // Join consecutive simple statements using the “comma operator”
      },
      mangle: true, // Shorten variable names
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
