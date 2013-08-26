var should  = require('should')
  , objCase = require('..');

describe('obj-case', function () {

  describe('.find()', function () {
    it('should find simple keys', function () {
      objCase({ a : 'b' }, 'a').should.eql('b');
      objCase({ first_name : 'Calvin' }, 'firstName').should.eql('Calvin');
      objCase({ 'first name' : 'Calvin' }, 'first_name').should.eql('Calvin');
    });

    it('should find nested keys', function () {
      objCase({ a : { b : { c : 'd' }}}, 'a.b.c').should.eql('d');
      objCase({ 'A bird' : { 'flew_under' : { 'theTrain' : 4 }}},
              'aBird.FLEW UNDER.the train').should.eql(4);
    });

    it('should find falsey keys', function () {
      objCase({ a : { b : false }}, 'a.b').should.eql(false);
      objCase({ a : { b : 0 }}, 'a.b').should.eql(0);
    });
  });


  describe('.del()', function () {
    it('should delete simple keys', function () {
      var obj = { firstName : 'Calvin', lastName : 'French-Owen' };
      objCase.del(obj, 'first name').should.eql({ 'lastName' : 'French-Owen' });
    });

    it('should delete nested keys', function () {
      objCase.del({ 'A bird' : { 'flew_under' : { 'theTrain' : 4 }}},
                   'aBird.FLEW UNDER').should.eql({ 'A bird' : {}});
    });
   });


  describe('.replace()', function () {
    it('should replace simple keys', function () {
      var obj = { firstName : 'Calvin', lastName : 'French-Owen' };
      objCase.replace(obj, 'last name', 'Harris').should.eql({
        firstName : 'Calvin',
        lastName  : 'Harris'
      });
    });

    it('should replace nested keys', function () {
      var obj = { "Calvin" : { dog : 'teddy' }};
      objCase.replace(obj, "Calvin.dog", 'the tedster').should.eql({
        "Calvin" : { dog : 'the tedster' }
      });
    });
  });
});