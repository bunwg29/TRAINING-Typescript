import { defineConfig } from 'vite';


export default defineConfig({

   base: '/',
   root: '.',
   build: {
      target: "esnext",
      outDir: '../dist'
   },

   resolve: {
      alias: {
         "@": "",
      },
   },
   server: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
   },
})




