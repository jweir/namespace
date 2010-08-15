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

  test("able to declare namespace as an object", function () {
    (function () {
      declare("com.acme.Person", function (firstName, lastName) {
        function lastNameFirst() {
            return lastName + ", " + firstName;
        }
        return [ { firstName: firstName, lastName: lastName }, lastNameFirst ];
      });
      declare("com.acme.Cat", function () {
        function vocalize() {
            return "Meow!";
        }
        return [ vocalize ];
      });
    })();

    var person = new com.acme.Person("John", "Weir");

    equals("John", person.firstName);
    equals("Weir", person.lastName);
    equals("Weir, John", person.lastNameFirst());

    var cat = new com.acme.Cat();
    equals("Meow!", cat.vocalize());
  });
});
