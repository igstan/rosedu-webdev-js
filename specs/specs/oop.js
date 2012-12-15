"use strict";

describe("OOP", function () {
  xit("exercise: write your own pseudo-class in JS", function () {
    // Create a JavaScript pseudo-class called `Foo` which exposes a method
    // called `arg`. This method when called should return whatever argument
    // has been passed tot the constructor.
    var foo;

    expect(foo instanceof Foo).toEqual(true);
    expect(foo.arg()).toEqual("stuff");
  });


  // Example of pseudo-private variables achieved using closures:
  //
  // var createBook = function () {
  //   var author = args[0]; // pseudo-private variable
  //   var name = args[1];   // pseudo-private variable

  //   return {
  //     title: function () {
  //       return author + name;
  //     }
  //   };
  // };
  xit("exercise: mimic a private static property from Java in JavaScript", function () {
    // Java example to mimic
    //
    // class Greeter {
    //   private static String greeting = "Hello";

    //   public String getGreeting() {
    //     return greeting;
    //   }

    //   public void setGreeting(String greeting) {
    //     this.greeting = greeting;
    //   }

    //   public String greet() {
    //     return greeting + "!";
    //   }

    //   public static void main(String... args) {
    //     Greeter greeter1 = new Greeter();
    //     Greeter greeter2 = new Greeter();

    //     greeter1.greet(); // "Hello!"
    //     greeter2.setGreeting("Halo");
    //     greeter1.greet(); // "Halo!"
    //   }
    // }
    var createGreeter = function () {
      // implementation
    };

    // Your task is to create a factory function called `createGreeter`, which
    // should mimic the Java declaration above and also satisfy the tests below.
    var greeter1 = createGreeter();
    var greeter2 = createGreeter();

    expect(greeter1.greet()).toEqual("Hello!");
    greeter2.setGreeting("Halo");
    expect(greeter1.greet()).toEqual("Halo!");
  });

  xit("exercise: event registrar", function () {
    // Test setup; you can ignore this for now.
    var domElement = createTestDomElement();

    // Your task is to create an `EventRegistrar` class which acts according
    // to the tests below.
    var registrar = new EventRegistrar(domElement);
    var handler   = function () { console.log("element clicked"); };
    var canceller = registrar.on("click", handler);

    // Calling the `on` method should defer execution to the `addEventListener`
    // method on the DOM element.
    expect(domElement.addEventListener).toHaveBeenCalledWith("click", handler);

    canceller.cancel();
    // Calling the `on` method should defer execution to the `removeEventListener`
    // method on the DOM element.
    expect(domElement.removeEventListener).toHaveBeenCalledWith(handler);
  });
});
