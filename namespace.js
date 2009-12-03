(function(root){

  // Provides namespaced access to functions within a closure, temporary scope.
  //
  // useage
  //  (function(){
  //    namespace("space", public_func);
  //
  //    function private_func(n){ return [n, "private"].join(" and ")};
  //    function public_func(n){ return private_func(n);}
  //  })();
  //
  //  space.public_func("good"); /* => "good and private" */
  //
  // allows one or more functions
  //    namespaces("foo", func_a, func_b, ...)
  //
  // accepts nested namespaces, even if the parent does not yet exist
  //    namespaces("foo.bar", func)
  //
  // if no string is given as the first argument, the functions will be scoped to the root

  namespace(namespace);

  function namespace(namespace, functions) {
    if(typeof arguments[0] != "string"){
      return namespace_for_root.apply(this, arguments);
    }

    var parts = arguments[0].split(".")
        space = namespaceFor(parts);

    for (var i=1; i < arguments.length; i++) {
      space[functionName(arguments[i])] = arguments[i]
    };
  };

  function namespace_for_root(functions){
    for (var i=0; i < arguments.length; i++) {
      root[functionName(arguments[i])] = arguments[i]
    };
  }

  function functionName(fn) {
    return fn.name ? fn.name : fn.toString().match(/^\s*function\s+([^\s\(]+)/)[1];
  }

  function namespaceFor(parts) {
    var space = root;

    for (var i=0; i < parts.length; i++) {
      space = space[parts[i]] = space[parts[i]] || {};
    };
    return space;
  }

})(this); // <- change this if you want to change the scope of namespace

