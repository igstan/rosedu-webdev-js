// This is a special expression which instructs the interpreter to be more
// strict about the syntax it accepts and the semantics it uses to interpret
// that syntax. It will only take effect if it's the first JS expression in
// the file or in a function. It is a good idea to start your script with
// this because things that are rejected in strict mode will disappear in
// future versions of the JavaScript language.
"use strict";

// Variables
// -----------------------------------------------------------------------------
//
// `describe` is the name of a function defined in the library we're using to
// write these tests, Jasmine. It takes two arguments, the first being an
// explanation of the thing you're trying to describe. This explanation will
// be used to report the outcome of running your tests. The second argument is
// a function holding the suite of tests that characterize what you're trying
// to describe. Each such child test may be a simple test, which can be
// constructed using the `it` function, or another whole suite, using the
// `describe` function. This goes ad infinitum, recursively.
describe("variables", function () {
  // As I previously said, we can add the `"use strict"` directive at the
  // beginning of a function too. In this case however it's unneeded as
  // the whole file will be interpreted using strict semantics.
  "use strict";

  // This is our first test, constructed using the `it` function. As was the
  // case with `describe`, the first argument is a description of the test
  // which will be used when building the tests report. The second argument
  // is a function which contains your assertions. You **cannot** add new
  // tests here using either `describe` or `it`.

  // Let's learn how to defined some variables.
  it("are undefined when not initialized to a value", function () {
    var a;

    // `expect(a).toEqual(b)` is one way to make assertions about what you're
    // describing. These are also defined in the Jasmine testing library.
    //
    // `expect` takes as an argument the thing that you don't know what value
    // holds, but you know what you'd expect it to be, hence the name.
    //
    // The next part, `.toEqual`, is a method call, we'll learn more about
    // this a bit later, which verifies that the argument passed to `expect`
    // is equal to the argument passed to `toEqual`.
    //
    // That's all I'll tell you about the Jasmine testing framework in this
    // little course.
    expect(a).toEqual(undefined);
  });

  it("which is equivalent to explicitly assigning undefined", function () {
    var a = undefined;
    expect(a).toEqual(undefined);
  });

  it("but use null to represent missing values", function () {
    var a = null;
    expect(a).toEqual(null);
  });
});


// Basic Types
// -----------------------------------------------------------------------------
//
// Now that we know how to define variables, let's see what we can put in them.
describe("basic types", function () {
  describe("booleans", function () {
    it("true, false and the negation operator", function () {
      var a = true;
      var b = false;
      expect(a).toEqual(!b);
    });

    it("boolean operator &&", function () {
      expect(true && true).toEqual(true);
      expect(true && false).toEqual(false);
    });

    it("boolean operator ||", function () {
      expect(true || true).toEqual(true);
      expect(true || false).toEqual(true);
      expect(false || false).toEqual(false);
    });
  });

  describe("numbers", function () {
    it("integers, floats and hexadecimals are all the same", function () {
      1;
      1.0;
      1.2;
      0x01;
      0xfc;
      0xFC;
    });

    it("the + operator performs addition", function () {
      expect(1 + 2).toEqual(3);
    });
  });

  describe("strings", function () {
    it("double-quoted", function () {
      var s = "double-quoted strings";
    });

    it("single-quoted", function () {
      var s = "double-quoted strings";
    });

    it("support escaping using a backslash", function () {
      var a = 'O\'reilly';
      var b = "O'reilly";
    });

    describe("special characters", function () {
      it("work with single-quoted strings", function () {
        var s = 'line 1\nline 2';
      });

      it("as well as double-quoted strings", function () {
        var s = "line 1\nline 2";
      });

      it("the + operator performs concatenation", function () {
        expect("foo" + "bar").toEqual("foobar");
      });
    });
  });

  describe("arithmetic operations with non-number operands", function () {
    it("addition", function () {
      var r = 2 + 4 + " foo " + 2 + 4;
      expect(r).toEqual("6 foo 24"); // ((((2 + 4) + " foo ") + 2) + 4)
    });

    // NaN = Not a Number
    it("subtraction", function () {
      expect(isNaN(1 - "foo")).toEqual(true);
    });

    it("multiplication", function () {
      expect(isNaN(1 * "foo")).toEqual(true);
    });

    it("division", function () {
      expect(isNaN(1 - "foo")).toEqual(true);
    });
  });
});

// Objects
// -----------------------------------------------------------------------------
//
// Even though we call them objects we're treating them as simple mappings
// from keys to values, similar to the Map<K,V> interface in Java. They're
// still objects, we just don't add enough things to them to make them look
// like the object you're familiar with from Java. We'll talk about that later.
describe("objects", function () {
  it("empty object", function () {
    var object = {};
  });

  describe("properties (key-value pairs)", function () {
    it("keys must be strings", function () {
      var object = {
        "key": "value"
      };
    });

    it("or numbers", function () {
      var object = {
        1: "value"
      };
    });

    // You may put a comma after the last property, but due to bugs in
    // Internet Explorer you cannot actually, because you'll introduce bugs.
    it("properties are separated by commas", function () {
      var object = {
        "key": "value",
        1: "value"
      }
    });

    it("key quoting is option when they are valid JS identifiers", function () {
      var object = {
        key: "value",
        "this must be quoted": "other value"
      };
    });

    it("values can be anything", function () {
      var book = {
        title: "JavaScript: the Good Parts",
        pages: 172,
        read: false
      };
    });

    it("including other objects", function () {
      var book = {
        title: "JavaScript: the Good Parts",
        pages: 172,
        read: false,
        author: {
          firstName: "Douglas",
          lastName: "Crockford"
        }
      };
    });
  });

  describe("reading properties", function () {
    var book = {
      title: "JavaScript: the Good Parts",
      pages: 172,
      read: false,
      author: {
        firstName: "Douglas",
        lastName: "Crockford"
      }
    };

    it("using dot notation, the recommended syntax", function () {
      expect(book.pages).toEqual(172);
    });

    it("using bracket notation, when necessary", function () {
      expect(book["pages"]).toEqual(172);
    });

    // When the property name is dynamic you can't use dot notation for
    // obvious reasons.
    it("property names can be dynamic", function () {
      var propertyName = "pages";
      expect(book[propertyName]).toEqual(172);
      expect(book.propertyName).toEqual(undefined);
    });

    it("reading a non-existent property will return undefined", function () {
      expect(book.propertyName).toEqual(undefined);
    });

    it("may check for property existence using the in operator", function () {
      expect("title" in book).toEqual(true);
      expect("dummy" in book).toEqual(false);
    });

    it("may check for property existence using the hasOwnProperty method", function () {
      expect(book.hasOwnProperty("title")).toEqual(true);
      expect(book.hasOwnProperty("dummy")).toEqual(false);
    });
  });

  describe("updating properties", function () {
    var book = {
      title: "JavaScript: the Good Parts",
      pages: 172,
      read: false,
      author: {
        firstName: "Douglas",
        lastName: "Crockford"
      }
    };

    it("using dot notation", function () {
      expect(book.pages).toEqual(172);
      book.pages = 1;
      expect(book.pages).toEqual(1);
    });

    it("using bracket notation", function () {
      expect(book.read).toEqual(false);
      book["read"] = true;
      expect(book.read).toEqual(true);
    });
  });

  describe("deleting properties", function () {
    it("accomplished using the `delete` keyword", function () {
      var book = { title: "Title" };
      expect(book.title).toEqual("Title");
      delete book.title;
      expect(book.title).toEqual(undefined);
    });

    it("delete returns whether the operation has succeeded", function () {
      var book = { title: "Title" };
      var result = delete book.title;
      expect(result).toEqual(true);
    });

    // It's a common pitfall to believe that `delete` works on variables too.
    // It does not. It only works on **object properties**. Strict mode offers
    // protection against this by not letting the code below to be parsed.
    // Uncomment it and you'll see the error thrown.

    /*
    it("delete works on object properties, not on variables", function () {
      var a = 1;
      expect(delete a).toEqual(false);
      expect(a).toEqual(1);
    });
    */
  });
});

// Arrays
// -----------------------------------------------------------------------------
//
// An **ordered** collection of **heterogeneous** values.
describe("arrays", function () {
  it("empty array", function () {
    var array = [];
  });

  it("elements are comma-separated", function () {
    var array = ["one", "two", "three"];
  });

  it("can contain values of any type", function () {
    var array = ["one", undefined, null, 1, true, {}, []];
  });

  it("array.length tells you how many elements there are", function () {
    var array = [1, 2, 3];
    expect(array.length).toEqual(3);
  });

  describe("reading elements", function () {
    it("using bracket notation", function () {
      var array = ["one", "two", "three"];
      array[0];
    });

    it("counting starts at zero", function () {
      var array = ["one", "two", "three"];
      expect(array[0]).toEqual("one");
    });

    it("out-of-bounds indices will return undefined", function () {
      var array = ["one", "two", "three"];
      expect(array[5]).toEqual(undefined);
    });
  });

  describe("updating elements", function () {
    it("similar to updating object properties", function () {
      var array = ["one", "two", "three"];
      array[0] = 1;
      array[1] = 2;
      array[2] = 3;
      expect(array).toEqual([1, 2, 3]);
    });

    it("when the index does not exist it gets created", function () {
      var array = [];
      array[0] = 1;
      expect(array).toEqual([1]);
    });

    it("missing indices are filled with undefined values", function () {
      var array = [];
      array[0] = 1;
      array[1] = 2;
      array[3] = 3;
      expect(array).toEqual([1, 2, undefined, 3]);
    });
  });

  describe("deleting elements", function () {
    it("using the delete operator gives unwanted results", function () {
      var array = [1, 2, 3];
      expect(delete array[2]).toEqual(true);
      expect(array).toEqual([1, 2, undefined]);
    });

    it("correct way is by using the splice method", function () {
      var array = [1, 2, 3];
      var removedElements = array.splice(2, 1);
      expect(removedElements).toEqual([3]);
      expect(array).toEqual([1, 2]);
    });
  });
});

// ## Control Structures
describe("control structures", function () {
  it("if", function () {
    var a;

    if (true) {
      a = 1;
    }

    expect(a).toEqual(1);
  });

  it("if/else", function () {
    var a;

    if (false) {
      a = 1;
    } else {
      a = 2;
    }

    expect(a).toEqual(2);
  });

  it("ternary if expression", function () {
    var a = true ? "yes" : "no";
    expect(a).toEqual("yes");
  });

  it("switch statement", function () {
    var a;

    switch ("bar") {
      case "foo":
        a = "foo";
        break;
      case "bar":
        a = "bar";
        break;
      case "baz":
        a = "baz";
        break;
      default:
        a = "default";
    }

    expect(a).toEqual("bar");
  });

  it("while loop", function () {
    var a = 5;
    var r = "";

    // We'll see below why we use `!==` instead of `!=`.
    while (a !== 0) {
      r += "a";
      a--;
    }

    expect(r).toEqual("aaaaa");
  });

  it("do/while loop with false condition", function () {
    var r = "";

    do {
      r += "a";
    } while (false);

    expect(r).toEqual("a");
  });

  it("do/while loop with true condition", function () {
    var a = 5;
    var r = "";

    do {
      r += "a";
      a--
    } while (a !== 0);

    expect(r).toEqual("aaaaa");
  });

  it("for loops", function () {
    var a = [1, 2, 3, 4, 5];
    var b = [];

    for (var i = 0; i < a.length; i++) {
      b[i] = a[i] * 2;
    };

    expect(b).toEqual([2, 4, 6, 8, 10]);
  });

  it("for-in loops iterate over an object's properties", function () {
    var object = {
      foo: 1,
      bar: true,
      baz: null
    };

    // Order of iteration is not guaranteed. Usually the properties will be
    // iterated in definition order, but you can't rely on it as the specs
    // don't mandate this.
    for (var prop in object) {
      var expected;

      switch (prop) {
        case "foo": expected = 1;    break;
        case "bar": expected = true; break;
        case "baz": expected = null; break;
        default:
          // I don't know what to do here...
      }

      expect(object[prop]).toEqual(expected);
    }
  });
});

// Functions
// -----------------------------------------------------------------------------
describe("functions", function () {
  it("can be assigned to variables", function () {
    var fn = function () {
      return "hello";
    };

    expect(fn()).toEqual("hello");
  });

  it("can be passed as arguments", function () {
    var fn = function () {
      return "hello";
    };
    var callFn = function (fn) {
      return fn();
    };

    var result = callFn(fn);

    expect(result).toEqual("hello");
  });

  it("can be passed as arguments, inlined", function () {
    var callFn = function (fn) {
      return fn();
    };

    // Exactly what we've seen until now with `describe` and `it`.
    var result = callFn(function () {
      return "hello";
    });

    expect(result).toEqual("hello");
  });

  // Rename `xit` to `it` to have this test running.
  // Assumes: higher-order functions (functions receiving functions)
  xit("exercise: define the higher-order map function", function () {
    // Your task here is to define `map`, a function which takes two arguments:
    //
    //  1. an array of elements (of any type)
    //  2. a function which accepts a single argument and returns a
    //     transformation of that argument.
    //
    // The return value must be an array of values produced by calling the
    // second argument, the function, on each of the values in the first
    // argument. The elements must be processed in the order of the input
    // array and this should reflect in the order of the output array.
    var map;

    var doubles = map([1, 2, 3], function (a) {
      return a * 2;
    });
    expect(doubles).toEqual([2, 4, 6]);

    var triples = map([1, 2, 3], function (a) {
      return a * 3;
    });
    expect(triples).toEqual([3, 6, 9]);
  });

  it("can be returned from functions", function () {
    var fn = function () {
      return "hello";
    };
    var makeFn = function () {
      return fn;
    };

    var result = makeFn()();

    expect(result).toEqual("hello");
  });

  it("can be returned from functions, inlined", function () {
    var makeFn = function () {
      return function () {
        return "hello";
      };
    };

    var result = makeFn()();
    expect(result).toEqual("hello");
  });

  // Assumes: higher-order functions (functions returning functions)
  xit("exercise: can return functions as results", function () {
    // Your task here is to defined a function called add10 so that
    // the following verification passes. `add10` should ultimately
    // return a function which adds 10 to the passed-in argument and
    // returns the result of the addition.
    var add10;

    expect(add10()()(1)).toEqual(11);
    expect(add10()()(2)).toEqual(12);
    expect(add10()()(3)).toEqual(13);
  });

  it("can be assigned as a value to an object property, becoming a method", function () {
    var book = {
      startReading: function () {
        return "reading...";
      }
    };

    // using dot notation (preferred)
    expect(book.startReading()).toEqual("reading...");

    // using bracket notation
    expect(book["startReading"]()).toEqual("reading...");
    expect(book["start" + "Reading"]()).toEqual("reading...");
  });

  it("can be called with any number of arguments", function () {
    var fn = function () {
      return arguments;
    };

    // Arguments isn't quite an array, but an array-like object.
    // However, Jasmine lets us compare it to an actual array object.
    expect(fn(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
  });

  describe("the special arguments variable", function () {
    it("has a length property", function () {
      var fn = function () {
        return arguments.length;
      };

      expect(fn(1, 2, 3)).toEqual(3);
    });

    it("arguments can be accessed using numeric, zero-based, indices", function () {
      var fn = function () {
        return arguments[1];
      };

      expect(fn(1, 2, 3)).toEqual(2);
    });

    it("but it doesn't have methods characteristic of an array", function () {
      var fn = function () {
        // Because `arguments` is an object we can check for the presence
        // of a certain property, a method in this case.
        return "concat" in arguments;
      };

      expect([1, 2].concat([3])).toEqual([1, 2, 3]);
      expect(fn(1, 2, 3)).toEqual(false);
    });
  });

  describe("scope", function () {
    it("values defined inside a function aren't visible outside it", function () {
      var a = 0;

      var fn = function () {
        // We say that this `a` **shadows** the outer `a`.
        var a = 1;
        return 2;
      };

      expect(fn()).toEqual(2);
      expect(a).toEqual(0);
    });

    it("values defined outside a function aren't visible inside it", function () {
      var a = 0;

      var fn = function () {
        return a;
      };

      expect(a).toEqual(0);
    });

    // This will change in ECMAScript 6 when two new var-like syntax elements
    // will be introduced. One of them is `let`, the other is `const`.
    it("only functions introduce scope, control structures don't", function () {
      var a = 1;

      if (true) {
        var a = 2;
      } else {
        var a = 3;
      }

      expect(a).toEqual(2);
    });

    it("neither blocks", function () {
      var a = 1;

      // In C or Java a block like the following will introduce scope.
      // This is not applicable to JS. Because of this blocks aren't that
      // useful in JavaScript. Note also that this syntax and the one for
      // objects are similar.
      {
        var a = 2;
      }

      expect(a).toEqual(2);
    });
  });

  describe("closures", function () {
    it("a function can retain a reference to a variable defined in a context that no longer exists", function () {
      var makeGreeter = function (hello) {
        // The function we're returning here is able to keep a reference to
        // the `hello` param and access it in the future. It is said that
        // the function **closes** over the environment in which it has been
        // defined. This link to the outer environment is called a "closure".
        // It doesn't necessarily have to be a param, a normal variable would
        // do as well.
        return function (who) {
          return hello + who;
        };
      };

      var greeter = makeGreeter("Hello, ");

      expect(greeter("world!")).toEqual("Hello, world!");
      expect(greeter("everyone!")).toEqual("Hello, everyone!");
      expect(makeGreeter("Hello")(" all!")).toEqual("Hello all!");
    });

    // Assumes: higher-order functions, closures
    xit("exercise: create a counter function", function () {
      // For this exercise you'll have to define a function named makeCounter
      // which takes an initial value for a count and returns a function which
      // will increment that count on each call and return the new count value.
      var startCounter;
      var count = startCounter(3);

      expect(count()).toEqual(3);
      expect(count()).toEqual(4);
      expect(count()).toEqual(5);
      expect(count()).toEqual(6);
    });

    // Assumes: objects, higher-order functions, closures
    xit("exercise: mimic expect(1).toEqual(1)", function () {
      // Your task here is to implement `myExpect`, a function that mimics the
      // interface of the `expect` function we've been using from the start.
      var myExpect;

      expect( myExpect(1).myToEqual(1) ).toEqual(true);
      expect( myExpect(1).myToEqual(2) ).toEqual(false);
      expect( myExpect(2).myToEqual(2) ).toEqual(true);

      expect( myExpect(2) instanceof MyExpecter ).toEqual(true);
    });
  });
});

// Equality
// -----------------------------------------------------------------------------
describe("equality", function () {
  it("the == operator performs type coercion", function () {
    expect(0 == "").toEqual(true);
    expect(0 == "0").toEqual(true);
    expect(0 == 0).toEqual(true);
  });

  // This type of equality is usually called "strict equality", but it has
  // nothing to do with the special "use strict" string;
  it("the === operator checks for equality of types", function () {
    expect(0 === "").toEqual(false);
    expect(0 === "0").toEqual(false);
    expect(0 === 0).toEqual(true);
  });

  it("basic types are compared by value", function () {
    expect(true === true).toEqual(true);
    expect(1 === 1).toEqual(true);
    expect("value" === "value").toEqual(true);
  });

  it("arrays are compared by reference", function () {
    var a = [];
    var b = [];
    expect(a === b).toEqual(false);
    expect(a === a).toEqual(true);
    expect(b === b).toEqual(true);

    // Most of the time it is useful to compare them by value, that's why
    // Jasmine's `toEqual` uses value comparison.
    expect(a).toEqual(b);
  });

  it("objects are compared by reference", function () {
    var a = {};
    var b = {};
    expect(a === b).toEqual(false);
    expect(a === a).toEqual(true);
    expect(b === b).toEqual(true);

    // Just as with arrays, most of the time we'd like objects compared by
    // value instead of reference.
    expect(a).toEqual(b);

    // There's no built-in function or operator to compare arrays or objects
    // by values. You'll need a library for that. My recommendation is to use
    // underscore.js. It has many more other utility functions except `isEqual`.
    expect(_.isEqual([], [])).toEqual(true);
    expect(_.isEqual({}, {})).toEqual(true);
  });

  it("functions are compared by reference", function () {
    var a = function () {};
    var b = function () {};
    expect(a === b).toEqual(false);
    expect(a === a).toEqual(true);
    expect(b === b).toEqual(true);
  });

  it("NaN !== NaN", function () {
    expect(NaN === NaN).toEqual(false);
    expect(isNaN(NaN)).toEqual(true);
  });

  xit("exercise: what kind of equality does a switch statement uses? figure it out", function () {
    // What test would you write to verify this? Can you think of two values
    // which are equal when compared using `==`, but not when using `===`?
    // How would you translate those checks into a `switch` statement?
  });
});

// Truthiness and Falseness
// -----------------------------------------------------------------------------
describe("truthiness and falseness", function () {
  it("is pretty complicated", function () {
    expect(!!true).toEqual(true);
    expect(!!false).toEqual(false);
    expect(!!undefined).toEqual(false);
    expect(!!null).toEqual(false);
    expect(!!"").toEqual(false);
    expect(!!0).toEqual(false);
    expect(!!NaN).toEqual(false);
    expect(!!1).toEqual(true);
    expect(!!{}).toEqual(true);
    expect(!![]).toEqual(true);
  });
});
