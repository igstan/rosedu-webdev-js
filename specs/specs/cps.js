"use strict";

describe("CPS: Continuation Passing Style", function () {
  xit("exercise: transform the example code snippet below to CPS", function () {
    // Test set up; ignore this for now.

    // This is the non-CPS version of the code you'll have to CPS. Notice that
    // each function **returns** some value. All of your function should return
    // nothing.
    //
    //
    // var foo = function () {
    //   return "foo";
    // };
    //
    // var bar = function () {
    //   return "bar";
    // };
    //
    // var baz = function () {
    //   return foo() + bar();
    // };
    //
    // expect(baz()).toEqual("foobar");

    // Each of these three functions should not return anything. Instead, they
    // receive as argument a function which they should call with what would
    // otherwise be the returned result.
    var foo = function (k) { /* ... */ };
    var bar = function (k) { /* ... */ };
    var baz = function (k) { /* ... */ };


    var k = jasmine.createSpy("k");

    foo(k);
    expect(k).toHaveBeenCalledWith("foo");

    bar(k);
    expect(k).toHaveBeenCalledWith("bar");

    baz(k);
    expect(k).toHaveBeenCalledWith("foobar");
  });
});
