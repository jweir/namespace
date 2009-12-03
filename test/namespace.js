$(document).ready(function() {

  module("namespace()");

  test("exposes all functions after the namespace attribute", function(){

    (function(){
      namespace("foo", one, two, three);
      function priv(n) { return n;}
      function one() { return priv(1);}
      function two() { return priv(2);}
      function three() { return priv(3);}
    })();

    equals(1, foo.one());
    equals(2, foo.two());
    equals(3, foo.three());
    equals(undefined, foo.priv);
  });

  test("creates nested namespaces using dot notation", function(){
    (function(){
     namespace("foo.bar.zoo", twelve);
      function twelve(){ return x(); }
      function x(){ return 12; }
    })();

    equals(12, foo.bar.zoo.twelve());
  });

  test("works with existing objects(ie Array.prototype)", function(){
    (function(){
     namespace("Array.prototype", len);
      function len(){ return this.length; }
    })();

    equals(3, ["a","b","c"].len());
  });



});
