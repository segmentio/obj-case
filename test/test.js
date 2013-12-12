
describe('obj-case', function () {

  var expect  = require('expect.js')
    , objCase = require('..');

  describe('.find()', function () {
    it('should find simple keys', function () {
      expect(objCase({ a : 'b' }, 'a')).to.eql('b');
      expect(objCase({ first_name : 'Calvin' }, 'firstName')).to.eql('Calvin');
      expect(objCase({ 'first name' : 'Calvin' }, 'first_name')).to.eql('Calvin');
    });

    it('should find nested keys', function () {
      expect(objCase({ a : { b : { c : 'd' }}}, 'a.b.c')).to.eql('d');
      expect(objCase({ 'A bird': { flew_under: { theTrain: 4 } } }, 'a bird.flew_under.the_train')).to.eql(4);
    });

    it('should find falsey keys', function () {
      expect(objCase({ a : { b : false }}, 'a.b')).to.eql(false);
      expect(objCase({ a : { b : 0 }}, 'a.b')).to.eql(0);
    });
  });


  describe('.del()', function () {
    it('should delete simple keys', function () {
      var obj = { firstName : 'Calvin', lastName : 'French-Owen' };
      expect(objCase.del(obj, 'first name')).to.eql({ lastName: 'French-Owen' });
    });

    it('should delete nested keys', function () {
      expect(objCase.del({ 'A bird' : { 'flew_under' : { 'theTrain' : 4 }}}, 'aBird.FLEW UNDER')).to.eql({ 'A bird': {} });
    });
   });


  describe('.replace()', function () {
    it('should replace simple keys', function () {
      var obj = { firstName : 'Calvin', lastName : 'French-Owen' };
      expect(objCase.replace(obj, 'last name', 'Harris')).to.eql({
        firstName : 'Calvin',
        lastName  : 'Harris'
      });
    });

    it('should replace nested keys', function () {
      var obj = { "Calvin" : { dog : 'teddy' }};
      expect(objCase.replace(obj, "Calvin.dog", 'the tedster')).to.eql({
        "Calvin" : { dog : 'the tedster' }
      });
    });
  });
});
