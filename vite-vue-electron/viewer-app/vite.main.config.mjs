import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    nodePolyfills(),
  ],
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ['node'],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    
  },
});
