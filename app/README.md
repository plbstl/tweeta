# Tweeta

> Create tweets in the Metaverse!

### **Welcome 👋**

To get started, clone this repo and follow these commands:

1. Run `yarn` in this directory.

2. remove `process.env.BROWSER ||` in these files:

    - `app/node_modules/@project-serum/anchor/src/utils/common.ts`
    - `app/node_modules/@project-serum/anchor/dist/esm/utils/common.js`
    - `app/node_modules/@project-serum/anchor/dist/cjs/utils/common.js`

    You have to edit node_modules manually until https://github.com/project-serum/anchor/issues/1264 is resolved.

3. Run `yarn dev` to start the project

4. Start coding!
