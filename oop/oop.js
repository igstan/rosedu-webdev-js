// What is the essence of a class in Java? It's like a mold from which objects
// are created. A way of defining a taxonomy (or class) of things/objects.

var me = {
  firstName: "Ionuț",
  lastName: "Stan",
  username: "igstan",
  greet: function () {
    return "Hello, " + this.firstName + "!";
  }
};

var prototype = {
  greet: function () {
    return "Hello, " + this.firstName + "!";
  }
};

var createPerson = function (firstName, lastName, username) {
  var proto = Object.create(prototype);

  proto.firstName = firstName;
  proto.lastName = lastName;
  proto.username = username;

  return proto;
};

function Person(firstName, lastName, username) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.username = username;
}

Person.prototype.greet = function () {
  return "Hello, " + this.firstName + "!";
};

// var me = createPerson("Ionuț", "Stan", "igstan");
var me = new Person("Ionuț", "Stan", "igstan");

console.log(me.greet());
