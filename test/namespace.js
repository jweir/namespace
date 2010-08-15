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
  })

  test("declare creates a class with public methods", function() {
    (function(){
      declare("animals.cat", main, say, legs);

      function main(color){
        var self = {color:color};
        return self;
      }

      function private(){ return 4;}
      function legs()   { return private(); }
      function say(word){ return [word,this.color].join(" "); }

    })();

    var cat       = new animals.cat("brown");
    var other_cat = new animals.cat("black");

    equals(4, cat.legs());
    equals("brown", cat.color);
    equals("meow brown", cat.say("meow"));
    equals("meow black", other_cat.say("meow"));
  });

});
