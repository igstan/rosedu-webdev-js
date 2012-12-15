"use strict";

// like Map<String, String> in Java
var book = {
  name: "JavaScript, the Good Parts",
  author: "Douglas Crockford"
}; // <- object literal

var createBook_01 = function (name, author, pages) {
  return {
    name: name,
    author: author,
    title: function () {
      return name + ", by " + author + " has " + pages + " pages";
    }
  };
};

var proto = {
  name: "unknown",
  title: function () {
    return this.name + ", by " + this.author + " has " + this.pages + " pages";
  }
};

// Object.create()
var createBook_02 = function (name, author, pages) {
  var book = Object.create(proto);
  book.author = author;
  return book;
};

// var book = createBook_01("JavaScript, the Good Parts", "Douglas Crockford", 172);
// console.log(book.name);
// console.log(book.author);
// // console.log(book.pages); // not available
// console.log(book.title());

// var book = createBook_02("JavaScript, the Good Parts", "Douglas Crockford", 172);
// console.log(book.name);
// console.log(book.author);
// // console.log(book.pages); // not available
// console.log(book.title());

// var Book = function () {
//
// };
// constructor function
function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
}

// Book.prototype.name = "Unknown";
// Book.prototype.title = function () {
//   return this.name + ", by " + this.author + " has " + this.pages + " pages";
// };

Book.prototype = {
  name: "unknown",
  title: function () {
    return this.name + ", by " + this.author + " has " + this.pages + " pages";
  },

  toString: (function (oldToString) {
    return function () {
      return "foo " + oldToString.call(this);
    };
  })(Object.prototype.toString)
};


// var book = new Book("JavaScript, the Good Parts", "Douglas Crockford", 172);
// console.log(book.name);
// console.log(book.author);
// // console.log(book.pages); // not available
// console.log(book.title());
// console.log(book.toString());



var mixin = function (target, sources) {
  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];

    for (var prop in source) {
      target[prop] = source[prop];
    }
  }

  return target;
};

var A = {
  title: function () {
    return this.myTitle;
  }
};

var B = {
  countPages: function () {
    return this.pages;
  }
};

// console.log(A.title());
// B.countPages() === undefined

var newObj = mixin({}, [A, B]);
// newObj.myTitle = "Titlu";
// newObj.pages = 172;
// console.log(newObj.title());
// console.log(newObj.countPages());


// function Ctor() {
//   this.prop = "value";
// }

// var o = Ctor();
// console.log(o.prop);
