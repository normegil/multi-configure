'use strict';

var fs = require('fs');
var assert = require('chai').assert;
var parser = require('../../../lib/plugins/parser/json');

var name = 'json';

describe('Plugin: JSON Parser', function() {

  it('should accept format ' + name, function(done) {
    assert.equal(parser.format, name);
    done();
  });

  it('should have name ' + name.toUpperCase(), function(done) {
    assert.equal(parser.name, name.toUpperCase());
    done();
  });

  it('should be \'parser\' type', function(done) {
    assert.equal(parser.type, 'parser');
    done();
  });

  it('should parse json file', function(done) {
    var content = fs.readFileSync(__dirname + '/../../resources/config.json');
    var expected = {
      jsonField: 'JsonValue',
      testNumber: 2,
      priorityTest: 'Something\'s wrong',
      array: [3, 4, 5],
      object: {
        test1: 'object.test1.value',
        test2: 'object.test2.value',
      },
    };
    parser.parse(content, function(err, object) {
      if (err) return done(err);
      assert.deepEqual(object, expected);
      done();
    });
  });
  it('should not parse wrong json format', function(done) {
    var xmlContent = fs.readFileSync(__dirname + '/../../resources/wrong.json');
    parser.parse(xmlContent, function(err) {
      assert.notEqual(err, undefined);
      assert.notEqual(err, null);
      done();
    });
  });

});
