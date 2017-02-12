/* SOURCE FILE - Copyright (c) 2017 fast-config - Tanase Laurentiu Iulian - https://github.com/RealTimeCom/fast-config */
'use strict';

const fs = require('fs'),
    path = require('path'),
    mime = require('mimehttp');

const def = { index: 'index.html', cache: false, recursive: true }; // default options

function readdir(conf, cache, base, dir, opt) {
    let s, n;
    for (let v of fs.readdirSync(base + dir)) {
        s = fs.lstatSync(base + dir + path.sep + v);
        if (s.isDirectory() && opt.recursive) {
            readdir(conf, cache, base, dir + path.sep + v, opt);
        } else if (s.isFile()) {
            n = dir + path.sep + v;
            if (path.sep !== '/') { n = n.split(path.sep).join('/'); }
            if (opt.cache) { cache[dir + path.sep + v] = fs.readFileSync(base + dir + path.sep + v); } // cache enabled
            conf[dir + path.sep + v === path.sep + opt.index ? '/' : n] = cb => cb(opt.cache ? cache[dir + path.sep + v] : { src: base + dir + path.sep + v }, { 'Content-Type': mime.file(v) });
        }
    }
}

module.exports = function(dir, opt) { // opt = { index: 'index.html', cache: true, recursive: true }
    if (typeof dir !== 'string') { throw new Error('invalid dir type "' + (typeof dir) + '", String expected'); }
    dir = path.normalize(dir);
    if (dir === '' || dir === '.' || dir === '..') { throw new Error('invalid dir path name "' + dir + '"'); }
    const s = fs.lstatSync(dir);
    if (!s.isDirectory()) { throw new Error('dir "' + dir + '" is not directory'); } else {
        if (typeof opt === 'object') {
            opt = {
                index: 'index' in opt ? opt.index + '' : def.index,
                cache: 'cache' in opt ? Boolean(opt.cache) : def.cache,
                recursive: 'recursive' in opt ? Boolean(opt.recursive) : def.recursive
            };
        } else {
            opt = def;
        }
        let conf = {}, cache = {};
        readdir(conf, cache, dir, '', opt);
        return { GET: conf };
    }
};
