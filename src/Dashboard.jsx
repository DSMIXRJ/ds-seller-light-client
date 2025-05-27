8:52:02 AM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
8:52:01 AM: Netlify Build                                                 
8:52:01 AM: ────────────────────────────────────────────────────────────────
8:52:01 AM: ​
8:52:01 AM: ❯ Version
8:52:01 AM:   @netlify/build 33.2.0
8:52:01 AM: ​
8:52:01 AM: ❯ Flags
8:52:01 AM:   accountId: 6807efb607fd5e6f5f16753a
8:52:01 AM:   baseRelDir: true
8:52:01 AM:   buildId: 6835a74e9d5b9d9075f54454
8:52:01 AM:   deployId: 6835a74e9d5b9d9075f54456
8:52:01 AM: ​
8:52:01 AM: ❯ Current directory
8:52:01 AM:   /opt/build/repo
8:52:01 AM: ​
8:52:01 AM: ❯ Config file
8:52:01 AM:   /opt/build/repo/netlify.toml
8:52:01 AM: ​
8:52:01 AM: ❯ Context
8:52:01 AM:   production
8:52:01 AM: ​
8:52:01 AM: Build command from Netlify app                                
8:52:01 AM: ────────────────────────────────────────────────────────────────
8:52:01 AM: ​
8:52:01 AM: $ npm run build
8:52:01 AM: > ds_seller_light@0.0.0 build
8:52:01 AM: > vite build
8:52:01 AM: vite v5.4.19 building for production...
8:52:01 AM: transforming...
8:52:02 AM: ✓ 13 modules transformed.
8:52:02 AM: x Build failed in 426ms
8:52:02 AM: error during build:
8:52:02 AM: [vite:esbuild] Transform failed with 1 error:
8:52:02 AM: /opt/build/repo/src/Dashboard.jsx:104:0: ERROR: Expected "{" but found end of file
8:52:02 AM: file: /opt/build/repo/src/Dashboard.jsx:104:0
8:52:02 AM: 
8:52:02 AM: Expected "{" but found end of file
8:52:02 AM: 102|                <div className="mb-2 text-blue-500">{card.icon}</div>
8:52:02 AM: 103|                <div className=
8:52:02 AM: 104|
8:52:02 AM:    |  ^
8:52:02 AM: 
8:52:02 AM:     at failureErrorWithLog (/opt/build/repo/node_modules/esbuild/lib/main.js:1472:15)
8:52:02 AM:     at /opt/build/repo/node_modules/esbuild/lib/main.js:755:50
8:52:02 AM:     at responseCallbacks.<computed> (/opt/build/repo/node_modules/esbuild/lib/main.js:622:9)
8:52:02 AM:     at handleIncomingPacket (/opt/build/repo/node_modules/esbuild/lib/main.js:677:12)
8:52:02 AM:     at Socket.readFromStdout (/opt/build/repo/node_modules/esbuild/lib/main.js:600:7)
8:52:02 AM:     at Socket.emit (node:events:518:28)
8:52:02 AM:     at addChunk (node:internal/streams/readable:561:12)
8:52:02 AM:     at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
8:52:02 AM:     at Readable.push (node:internal/streams/readable:392:5)
8:52:02 AM:     at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)
8:52:02 AM: ​
8:52:02 AM: "build.command" failed                                        
8:52:02 AM: ────────────────────────────────────────────────────────────────
8:52:02 AM: ​
8:52:02 AM:   Error message
8:52:02 AM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
8:52:02 AM: ​
8:52:02 AM:   Error location
8:52:02 AM:   In Build command from Netlify app:
8:52:02 AM:   npm run build
8:52:02 AM: ​
8:52:02 AM:   Resolved config
8:52:02 AM:   build:
8:52:02 AM:     command: npm run build
8:52:02 AM:     commandOrigin: ui
8:52:02 AM:     publish: /opt/build/repo/dist
8:52:02 AM:     publishOrigin: ui
8:52:02 AM:   redirects:
8:52:02 AM:     - force: true
8:52:02 AM:       from: /api/*
      status: 200
      to: https://dsseller-backend-final.onrender.com/api/:splat
    - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
8:52:02 AM: Build failed due to a user error: Build script returned non-zero exit code: 2
8:52:02 AM: Failing build: Failed to build site
8:52:02 AM: Finished processing build request in 15.418s
