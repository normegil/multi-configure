'use strict';

var fs = require('fs');
var assert = require('chai').assert;
var parser = require('../../../lib/plugins/parser/cson');

var name = 'cson';

describe('Plugin: ' + name.toUpperCase() + ' Parser', function() {
  var resourceDirectory = __dirname + '/../../resources/assets/';
  it('should have name ' + name.toUpperCase(), function(done) {
    assert.equal(parser.name, name.toUpperCase());
    done();
  });

  it('should be \'parser\' type', function(done) {
    assert.equal(parser.type, 'parser');
    done();
  });

  it('should parse cson file', function(done) {
    var content = fs.readFileSync(resourceDirectory + 'config.cson');
    var expected = {
      csonField: 'CsonValue',
      test: 'Test',
      testNumber: 2,
      priorityTest: 'Something\'s wrong',
      array: [3, 4, 5],
      object: {
        test1: 'object.test1.value',
        test2: 'object.test2.value',
      },
    };
    parser.parse(content, function(err, object) {
      if (err) {return done(err);}
      assert.deepEqual(object, expected);
      done();
    });
  });
  it('should not parse wrong cson format', function(done) {
    var xmlContent = fs.readFileSync(resourceDirectory + 'wrong.xml');
    parser.parse(xmlContent, function(err) {
      assert.notEqual(err, undefined);
      assert.notEqual(err, null);
      done();
    });
  });
});
