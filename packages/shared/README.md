# Bundling

This internal package is being bundled along with it's consumers (web and cms). This bring about the following advantages:

- Helps reduce final bundle size by tree-shaking unused code as well as removing cjs exports (if consumer is esm) and esm exports (if consumer is cjs).
- Reduce io needed when initializing application due to importing all the files in node modules
- Overall this should help reduce cold starts


## Node API warning

However since we are bundling `@org/shared` along with our app, if `@org/shared` uses any packages that use node apis, it can break the application during runtime. This is why most of the time `node_modules` is excluded from the bundling processes especially when bundling nodejs apps.

This means that even if we specify packages that use node apis in `@org/shared`'s external which can be found in `tsup.config.ts`, those packages will still be bundled along with the consumer since the consumer's build process doesn't care about which packages are `@org/shared` used as external which is weird I'll admit.

Therefore, you should try to avoid using node packages that will break the consumer when bundled and instead let the consumer use those packages instead. Using types is okay since those get stripped out and thus will not cause upstream build process to try and include the node package in the final bundle
