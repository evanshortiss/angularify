angular-browserify
==================

Browserify transform to load angular dependencies in a browserify friendly 
manner with simple version selection via the _require_ statement.

## Install (NOT YET PUBLISHED TO NPM)
```
npm install angularify
```

## Usage in Code
In your application entry file simply use the standard _require_ statement to 
have a speecific version of Angular or a code Angular module loaded. You only 
need to do this once as Angular is then made global and modules will be bound 
in the usual Angular manner! 

An example Browserify entry point file is below.

```javascript
// Angular is now included in your browserify build (bundle.js)
require('angular@1.2.2');

// ngRoute is now included in your build too!
require('angular-route@1.2.2');

angular.module('MyApp', ['ngRoute']);

// Now write your app!
```

## TODO
Tests. I have just made this repository public and gotten the transform 
behaving, but now it needs to be tested to verify it works the way one expects 
it to in the browser.