'use strict';"use strict";
var browser_static_1 = require('angular2/platform/testing/browser_static');
var browser_1 = require('angular2/platform/browser');
/**
 * Providers for using template cache to avoid actual XHR.
 * Re-exported here so that tests import from a single place.
 */
var browser_2 = require('angular2/platform/browser');
exports.CACHED_TEMPLATE_PROVIDER = browser_2.CACHED_TEMPLATE_PROVIDER;
/**
 * Default platform providers for testing.
 */
exports.TEST_BROWSER_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS];
/**
 * Default application providers for testing.
 */
exports.TEST_BROWSER_APPLICATION_PROVIDERS = 
/*@ts2dart_const*/ [browser_1.BROWSER_APP_PROVIDERS, browser_static_1.ADDITIONAL_TEST_BROWSER_PROVIDERS];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtRGc3ck9iRUoudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBR08sMENBQTBDLENBQUMsQ0FBQTtBQUNsRCx3QkFBb0MsMkJBQTJCLENBQUMsQ0FBQTtBQUVoRTs7O0dBR0c7QUFDSCx3QkFBdUMsMkJBQTJCLENBQUM7QUFBM0Qsc0VBQTJEO0FBRW5FOztHQUVHO0FBQ1UsdUNBQStCO0FBQ3hDLGtCQUFrQixDQUFBLENBQUMsdURBQXNDLENBQUMsQ0FBQztBQUUvRDs7R0FFRztBQUNVLDBDQUFrQztBQUMzQyxrQkFBa0IsQ0FBQSxDQUFDLCtCQUFxQixFQUFFLGtEQUFpQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBURVNUX0JST1dTRVJfU1RBVElDX1BMQVRGT1JNX1BST1ZJREVSUyxcbiAgQURESVRJT05BTF9URVNUX0JST1dTRVJfUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlcl9zdGF0aWMnO1xuaW1wb3J0IHtCUk9XU0VSX0FQUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vKipcbiAqIFByb3ZpZGVycyBmb3IgdXNpbmcgdGVtcGxhdGUgY2FjaGUgdG8gYXZvaWQgYWN0dWFsIFhIUi5cbiAqIFJlLWV4cG9ydGVkIGhlcmUgc28gdGhhdCB0ZXN0cyBpbXBvcnQgZnJvbSBhIHNpbmdsZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHtDQUNIRURfVEVNUExBVEVfUFJPVklERVJ9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vKipcbiAqIERlZmF1bHQgcGxhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIC8qQHRzMmRhcnRfY29uc3QqL1tURVNUX0JST1dTRVJfU1RBVElDX1BMQVRGT1JNX1BST1ZJREVSU107XG5cbi8qKlxuICogRGVmYXVsdCBhcHBsaWNhdGlvbiBwcm92aWRlcnMgZm9yIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfQVBQTElDQVRJT05fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgLypAdHMyZGFydF9jb25zdCovW0JST1dTRVJfQVBQX1BST1ZJREVSUywgQURESVRJT05BTF9URVNUX0JST1dTRVJfUFJPVklERVJTXTtcbiJdfQ==