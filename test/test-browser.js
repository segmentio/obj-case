
describe('test-browser', function(){
  var objc = require('obj-case');
  var assert = require('assert');

  it('should be ok', function(){
    assert('function' == typeof objc);
    assert('function' == typeof objc.replace);
  })
})
