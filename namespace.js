(function(root){
  // Creates namespaced functions within a closure.
  // Public domain (no copyright) http://github.com/jweir/namespace
  // John Weir john@famedriver.com
  //
  // Useage (within a closure)
  // namepace("moduleName", function1, function2, ...)
  //
  // Example
  //  (function(){
  //    namespace("space", publicFn, anotherFn);
  //
  //    function privateFn(n){ return [n, "private"].join(" and ")};
  //    function publicFn(n){ return privateFn(n);}
  //    function anotherFn(n){ return "another result";}
  //  })();
  //  space2.publicFn("good"); /* => "good and private" */
  //  
  //  Example2
  //  (function(){
  //    var obj = {
  //       myVar1:'23',
  //       myVar2: 12345,
  //       myFunction: function(myVar){
  //          return myVar;
  //       }
  //    }
  //    namespace("space2", obj);
  //  })();
  //
  // space2.myFunction("good"); /* => "good" */
  // space2.myVar1; /* => "23" */
  //
  // accepts nested namespaces, even if the parent does not yet exist
  //    namespaces("foo.bar", func)
  //
  // if no string is given as the first argument, the functions will be scoped to the root
  function namespace(moduleNamespace, functions) {
    if(typeof arguments[0] != "string"){
      return namespaceForRoot.apply(this, arguments);
    }

    var parts = arguments[0].split("."),
        space = namespaceFor(parts);

    for (var i=1; i < arguments.length; i++) {
      var arg = arguments[i];
      if(typeof(arg) == 'object' && arg != null){
        for(var prop in arg){
          if (arg.hasOwnProperty(prop)) {
            space[functionName(prop)] = arg[prop];
          }
        }
      }else if(typeof(arg) == 'function'){
        space[functionName(arg)] = arg;     
      }
    }
  }

  function namespaceForRoot(functions){
    for (var i=0; i < arguments.length; i++) {
      root[functionName(arguments[i])] = arguments[i];
    }
  }

  function functionName(fn) {
    if (typeof(fn) === 'string'){
        return fn;
    }
    return fn.name ? fn.name : fn.toString().match(/^\s*function\s+([^\s\(]+)/)[1];
  }

  function namespaceFor(parts) {
    var space = root;

    for (var i=0; i < parts.length; i++) {
      space = space[parts[i]] = space[parts[i]] || {};
    }
    return space;
  }

  namespace(namespace);
}(this)); // <- change this if you want to change the scope of namespace
