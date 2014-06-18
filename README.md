angular-browserify
==================

Browserify transform to load angular dependencies in a browserify friendly 
manner with simple version selection via the _require_ statement. 

I wanted to do this as Angular doesn't support UMD so *require-ing* it isn't 
really possible. What this module actually does is detects calls to require 
Angular in your entry point script and then includes angular before your
browserified entry point runs. 

## Challenges
Currently this module works almost as intended. It will download and inject 
Angular but it injects it within a closure (browserify's closure) so it is 
therefore not global making angular inaccessable from other modules. A 
workaround is provided in a below example.

## Usage in Code
In your application entry file simply use the standard _require_ statement to 
have a speecific version of Angular or a code Angular module loaded. You only 
need to do this once as Angular is then made global and modules will be bound 
in the usual Angular manner! 

An example Browserify entry point file is below.

```javascript
/**
 * file: main.js
 */

var angular = require('./angularProvider.js');

angular.module('MyApp', ['ngRoute']);
```

```javascript
/**
 * file: angularProvider.js
 */

// Angular is now included in your browserify build (bundle.js)
require('angular@1.2.2');
// ngRoute is now included in your build too!
require('angular-route@1.2.2');

module.exports = angular;
```

## TODO
Tests. I have just made this repository public and gotten the transform 
behaving, but now it needs to be tested to verify it works the way one expects 
it to when browserified.