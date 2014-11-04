// Generated by CoffeeScript 1.8.0

/*
Copyright (c) 2014, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var debug, fs, mkdirp, path;

fs = require('fs');

path = require('path');

mkdirp = require('mkdirp');

debug = require('debug')('testium:logs');

module.exports = function(config) {
  var logDirectory, openLogFile, resolveLogFile, root;
  root = config.root, logDirectory = config.logDirectory;
  resolveLogFile = function(name) {
    return path.resolve(root, logDirectory, "" + name + ".log");
  };
  openLogFile = function(name, flags, callback) {
    var dirname, filename;
    filename = resolveLogFile(name);
    dirname = path.dirname(filename);
    if (typeof flags === 'function') {
      callback = flags;
      flags = 'w+';
    }
    debug('Opening log', filename);
    return mkdirp(dirname, function(error) {
      if (error != null) {
        return callback(error);
      }
      return fs.open(filename, flags, function(error, fd) {
        if (error != null) {
          return callback(error, {});
        }
        return callback(null, {
          filename: filename,
          fd: fd
        });
      });
    });
  };
  return {
    openLogFile: openLogFile,
    resolveLogFile: resolveLogFile
  };
};