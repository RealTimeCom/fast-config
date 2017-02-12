/* TEST FILE - Copyright (c) 2017 fast-config - Tanase Laurentiu Iulian - https://github.com/RealTimeCom/fast-config */
'use strict';

const get = require('./index.js');

console.log(get('src', { index: 'index.html', cache: true, recursive: true }));
