## fast-config

**Fast configuration utility for Fast Stream HTTP Server**

```sh
$ npm install fast-config
```
### Example
```js
const get = require('fast-config');

const files = get('/path/src');
// OR, with options
const files = get('/path/src', {
    // file '/path/src/index.html' required
    index: 'index.html', // path URL '/' content
    cache: true, // read files as Buffer, 'false' is default
    recursive: true // read sub-directory tree contents, 'true' is default
});
```
### Host config example
```js
const get = require('fast-config');
const http = require('fast-stream'); // Fast Stream HTTP Server
const conf = {
    '*': get('/path/src') // Host "*" <for all>
};
require('net').createServer(sk => sk.pipe(new http(conf)).pipe(sk)).listen(80);
```

**For more info, consult <a href="https://github.com/RealTimeCom/fast-stream"><b>Fast Stream HTTP Server</b></a>**

--------------------------------------------------------
**fast-config** is licensed under the MIT license. See the included `LICENSE` file for more details.
