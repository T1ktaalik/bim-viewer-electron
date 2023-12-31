// vite.main.config.mjs
import { defineConfig } from "file:///F:/webdev/bim-viewer-electron/vite-vue-electron/viewer-app/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///F:/webdev/bim-viewer-electron/vite-vue-electron/viewer-app/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_main_config_default = defineConfig({
  plugins: [
    nodePolyfills()
  ],
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ["node"],
    mainFields: ["module", "jsnext:main", "jsnext"]
  }
});
export {
  vite_main_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5tYWluLmNvbmZpZy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx3ZWJkZXZcXFxcYmltLXZpZXdlci1lbGVjdHJvblxcXFx2aXRlLXZ1ZS1lbGVjdHJvblxcXFx2aWV3ZXItYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFx3ZWJkZXZcXFxcYmltLXZpZXdlci1lbGVjdHJvblxcXFx2aXRlLXZ1ZS1lbGVjdHJvblxcXFx2aWV3ZXItYXBwXFxcXHZpdGUubWFpbi5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi93ZWJkZXYvYmltLXZpZXdlci1lbGVjdHJvbi92aXRlLXZ1ZS1lbGVjdHJvbi92aWV3ZXItYXBwL3ZpdGUubWFpbi5jb25maWcubWpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgbm9kZVBvbHlmaWxscygpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgLy8gU29tZSBsaWJzIHRoYXQgY2FuIHJ1biBpbiBib3RoIFdlYiBhbmQgTm9kZS5qcywgc3VjaCBhcyBgYXhpb3NgLCB3ZSBuZWVkIHRvIHRlbGwgVml0ZSB0byBidWlsZCB0aGVtIGluIE5vZGUuanMuXG4gICAgYnJvd3NlckZpZWxkOiBmYWxzZSxcbiAgICBjb25kaXRpb25zOiBbJ25vZGUnXSxcbiAgICBtYWluRmllbGRzOiBbJ21vZHVsZScsICdqc25leHQ6bWFpbicsICdqc25leHQnXSxcbiAgICBcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzWCxTQUFTLG9CQUFvQjtBQUNuWixTQUFTLHFCQUFxQjtBQUU5QixJQUFPLDJCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFNBQVM7QUFBQTtBQUFBLElBRVAsY0FBYztBQUFBLElBQ2QsWUFBWSxDQUFDLE1BQU07QUFBQSxJQUNuQixZQUFZLENBQUMsVUFBVSxlQUFlLFFBQVE7QUFBQSxFQUVoRDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
