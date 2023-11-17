/* import type * as webpack from 'webpack';

export default function loader(
  this: webpack.LoaderContext<any>,
  source: string,
  inputSourceMap?: Record<string, any>
) {

}; */

import schema from './schema.json' assert { type: 'json' };
import { validate } from 'schema-utils';
import babel from '@babel/core';

const BABEL_LOADER_VERSION = '9.1.3';

export default async function loader(source, inputSourceMap) {
  // 
  console.log('babel-loader: ', source, inputSourceMap);
  const callback = this.async();

  const filename = this.resourcePath;

  const loaderOptions = this.getOptions();
  validate(schema, loaderOptions, {
    name: 'My babel loader'
  });

  // standardize on 'sourceMaps'
  if (loaderOptions.sourceMap && !loaderOptions.sourceMaps) {
    loaderOptions.sourceMaps = loaderOptions.sourceMap;

    delete loaderOptions.sourceMap;
  }

  const programmaticOptions = Object.assign({}, loaderOptions, {
    filename,
    inputSourceMap: inputSourceMap || loaderOptions.inputSourceMap,
    sourceMaps: loaderOptions.sourceMaps || this.sourceMap,

    // Ensure that Webpack will get a full absolute path in the sourcemap
    // so that it can properly map the module back to its internal cached
    // modules.
    sourceFileName: filename
  });

  delete programmaticOptions.customize;
  delete programmaticOptions.cacheDirectory;
  delete programmaticOptions.cacheIdentifier;
  delete programmaticOptions.cacheCompression;
  delete programmaticOptions.metadataSubscribers;

  const config = await babel.loadPartialConfigAsync(injectCaller(programmaticOptions, this.target));
  console.log('loaderOptions: ', loaderOptions);
  console.log('programmaticOptions: ', programmaticOptions);
  console.log('config: ', config);
  console.log('options.presets: ', config.options.presets);

  if (config) {
    const options = config.options;

    if (options.sourceMaps === 'inline') {
      // Babel has this weird behavior where if you set "inline", we
      // inline the sourcemap, and set 'result.map = null'. This results
      // in bad behavior from Babel since the maps get put into the code,
      // which Webpack does not expect, and because the map we return to
      // Webpack is null, which is also bad. To avoid that, we override the
      // behavior here so "inline" just behaves like 'true'.
      options.sourceMaps = true;
    }

    // loader-specific option
    const {
      cacheDirectory = false,
      cacheIdentifier = JSON.stringify({
        options,
        '@babel/core': babel.version,
        'babel-loader': BABEL_LOADER_VERSION
      }),
      cacheCompression = true,
      // Takes an array of context function names.
      // E.g. if you passed ['myMetadataPlugin'], you'd assign a subscriber function to context.myMetadataPlugin
      // within your webpack plugin's hooks & that function will be called with metadata.
      metadataSubscribers = []
    } = loaderOptions;

    let result = await transform(source, options);

    if (cacheDirectory) {
      // TODO: cache
    }

    // Add an existing file as a dependency of the loader result in order to make them watchable, to recompile
    config.files.forEach(configFile => this.addDependency(configFile));

    if (result) {
      const {
        code,
        map,
        metadata,
        externalDependencies
      } = result;

      if (externalDependencies) {
        // Add an existing file as a dependency of the loader result in order to make them watchable, to recompile
        externalDependencies.forEach(dep => this.addDependency(dep));
      }

      if (metadataSubscribers && Array.isArray(metadataSubscribers)) {
        metadataSubscribers.forEach(subscriber => {
          subscribe(subscriber, metadata, this);
        });
      }

      // return [code, map];
      callback(null, code, map);
    }
  }

  return [source, inputSourceMap];
}

function subscribe(subscriber, metadata, context) {
  if (context[subscriber]) {
    context[subscriber](metadata);
  }
}


/// injectCaller
function injectCaller(opts, target) {
  return Object.assign({}, opts, {
    caller: {
      name: 'my-babel-loader',
      target,
      supportsStaticESM: true,
      supprrtsDynamicImport: true,
      supportsTopLevelAwait: true,
      ...opts.caller
    }
  });
}


/// transform
async function transform(source, options) {
  let result;
  try {
    result = await babel.transformAsync(source, options);
  } catch(e) {
    throw e.message && e.codeFrame ? new Error(e.message) : e;
  }

  if (!result) return null;

  const {
    ast,
    code,
    map,
    metadata,
    sourceType,
    externalDependencies
  } = result;

  if (map && (!map.sourcesContent || !map.sourcesContent.length)) {
    map.sourcesContent = [source];
  }

  return {
    ast,
    code,
    map,
    metadata,
    sourceType,
    // Convert it from a Set to an Array to make it JSON-serializable
    externalDependencies: Array.from(externalDependencies || [])
  };
}
