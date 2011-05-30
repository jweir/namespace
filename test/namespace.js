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

  test("nested namespaces work across multiple source files", function(){
    stop(5000);
    expect(3);

    (function(){
      namespace("nested.files", root);
      function root() { return "ROOT"; }
      }
    )();

    var counter = 0;
    var both_loaded = function() {
      if ((counter += 1) == 2){
        equals("FILE_B", nested.files.b(), "b() is true");
        equals("FILE_A", nested.files.a(), "a() is true");
        equals("ROOT", nested.files.root(), "root() is true");
        start();
        return true}
      return false
    }

    $.getScript("file_b.js", function(){
      both_loaded();
    })

    $.getScript("file_a.js", function(){
      both_loaded();
    })
  });


  test("test objects can be passed in", function(){
    (function(){
      var obj = {
         myVar1:'23',
         myVar2: 12345,
         myFunction: function(myVar){
            return myVar;
         }
      }
      namespace("objspace", obj);
    })();

    equals(23, objspace.myVar1);
    equals(12345, objspace.myVar2);
    equals('test', objspace.myFunction('test'));
    equals(undefined, objspace.not_here);
  });



});
