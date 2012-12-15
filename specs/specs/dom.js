"use strict";

describe("DOM", function () {
  describe("element retrieval", function () {
    describe("getElementById", function () {
      it("retrieves the first element with the given HTML ID attribute", function () {
        var d = document.getElementById("some-div");
        expect(d.nodeName).toEqual("DIV");
      });
    });

    describe("getElementsByTagName", function () {
      it("retrieves all elements with the given tag", function () {
        var bodies = document.getElementsByTagName("body");
        expect(bodies.length).toEqual(1);
      });

      it("can be called on elements other than `document`", function () {
        var div = document.getElementById("some-div");
        var spans = div.getElementsByTagName("span");
        expect(spans.length).toEqual(3);
      });
    });

    describe("getElementsByClassName", function () {
      it("retrieves all elements having the given CSS class", function () {
        var elems = document.getElementsByClassName("test-class");
        expect(elems.length).toEqual(5);
        expect(elems[0].textContent).toEqual("span A");
        expect(elems[1].textContent).toEqual("span B");
        expect(elems[2].textContent).toEqual("span C");
        expect(elems[3].textContent).toEqual("span D");
        expect(elems[4].textContent).toEqual("span E");
      });
    });

    describe("querySelector", function () {
      it("retrieves the first element which matches the given CSS selector", function () {
        var span = document.querySelector("#some-div .test-class:nth-child(2)");
        expect(span.textContent).toEqual("span C");
      });
    });

    describe("querySelectorAll", function () {
      it("retrieves all elements which match the given CSS selector", function () {
        var spans = document.querySelectorAll("#some-div .test-class");
        expect(spans.length).toEqual(3);
        expect(spans[0].textContent).toEqual("span B");
        expect(spans[1].textContent).toEqual("span C");
        expect(spans[2].textContent).toEqual("span D");
      });

      // It was while writing this test when I fully understood the
      // behaviour of the `:nth-child` selector pseudo-class. Learning
      // tests are useful for discovering APIs or languages.
      it(":nth-child matches the position relative to the parent", function () {
        // The :nth-child pseudo-class matches all elements which have the
        // given index relative to their closest parent.
        var spans = document.querySelectorAll(".test-class:nth-child(2)");
        expect(spans.length).toEqual(2);
        expect(spans[0].textContent).toEqual("span A");
        expect(spans[1].textContent).toEqual("span C");
      });

      xit('exercise: retrieve the element which contains the text "span E" using querySelector', function () {
        var element;
        expect(element.textContent).toEqual("span E");
      });

      xit("exercise: what does querySelectorAll return when the selector is an " +
         "ID and there are multiple elements with the same ID on page?", function () {
        // For this exercise you'll have to modify the HTML in runner.html.
        // Add the required element(s) inside the script#clean-fixture tag.
        //
        // After you've added them, think about what you'll retrieve and
        // write you expectation. Then retrieve the actual stuff and see
        // if the tests pass.
      });
    });

    // You may wonder why there are other retrieval methods except
    // `querySelector` and `querySelectorAll`. That is because in
    // beginning nobody think of that. Initially there was only getElementById
    // and getElementsByTagName. After people noticed that retrieving elements
    // by CSS classes getElementsByClassName appeared. Finally, someone
    // realized that a full generalization would be even more useful. That
    // generalization was to retrieve DOM elements using CSS selectors.
    // Initially this was implemented as a JavaScript library, but soon
    // browsers added this feature in the form of two methods, querySelector
    // and querySelectorAll. The library that popularized this idea was jQuery,
    // although it was not the first to come up with it.
    //
    // Nowadays everybody uses jQuery for DOM manipulation and retrieval
    // because it exposes a very nice API (Application Programming Interface).
    // From now on we'll see how a task is accomplished with both native DOM
    // methods and jQuery.
    it("retrieval using jQuery", function () {
      // The $ symbol is a valid JS identifier (as many other weird symbols
      // are), and is used by jQuery to reduce typing. `jQuery` could be used
      // instead: jQuery("#some-div .test-class");
      var spans = $("#some-div .test-class");
      expect(spans.length).toEqual(3);

      expect(spans.eq(0).text()).toEqual("span B");
      expect(spans.eq(1).text()).toEqual("span C");
      expect(spans.eq(2).text()).toEqual("span D");
    });

    it("fetch next sibling element", function () {
      var dom = document.querySelector("#some-div .test-class").nextElementSibling;
      expect(dom.textContent).toEqual("span C");

      var jqr = $("#some-div .test-class").eq(0).next();
      expect(jqr.text()).toEqual("span C");
    });

    it("fetch previous sibling element", function () {
      var dom = document.querySelector("#some-div").previousElementSibling;
      expect(dom.textContent).toEqual("span A");

      var jqr = $("#some-div").prev();
      expect(jqr.text()).toEqual("span A");
    });

    it("fetch all children", function () {
      var dom = document.querySelector("#some-div").children;
      expect(dom[0].textContent).toEqual("span B");
      expect(dom[1].textContent).toEqual("span C");
      expect(dom[2].textContent).toEqual("span D");

      var jqr = $("#some-div").children();
      expect(jqr.eq(0).text()).toEqual("span B");
      expect(jqr.eq(1).text()).toEqual("span C");
      expect(jqr.eq(2).text()).toEqual("span D");
    });
  });

  // How to create new DOM elements and inject them into the body
  describe("element creation", function () {
    it("using document.createElement", function () {
      var strong = document.createElement("strong");
      strong.id = "strong-from-test";
      document.querySelector("#some-div").appendChild(strong);

      expect(document.querySelector("#strong-from-test").nodeName).toEqual("STRONG");
    });

    it("using document.createTextNode", function () {
      var strong = document.createElement("strong");
      strong.appendChild(document.createTextNode("inserted from test"));
      strong.id = "strong-from-test";
      document.querySelector("#some-div").appendChild(strong);

      expect(document.querySelector("#strong-from-test").textContent).toEqual("inserted from test");
    });

    it("using textContent", function () {
      var strong = document.createElement("strong");
      strong.textContent = "inserted from test";
      strong.id = "strong-from-test";
      document.querySelector("#some-div").appendChild(strong);

      expect(document.querySelector("#strong-from-test").textContent).toEqual("inserted from test");
    });

    it("using innerHTML", function () {
      var div = document.createElement("div");
      div.id = "div-from-test";
      div.innerHTML = "<span>inserted from test</span>";
      document.querySelector("#some-div").appendChild(div);

      expect(document.querySelector("#div-from-test span").textContent).toEqual("inserted from test");
    });

    it("using jQuery #1", function () {
      var strong = $("<strong>").text("inserted from test");
      $("#some-div").append(strong);

      expect($("#some-div strong").text()).toEqual("inserted from test");
    });

    it("using jQuery #2", function () {
      $("#some-div").append("<strong>inserted from test</strong>");
      expect($("#some-div strong").text()).toEqual("inserted from test");
    });
  });

  describe("element removal", function () {
    it('remove all elements with the "test-class" class', function () {
      var elems = document.querySelectorAll(".test-class");

      for (var i = 0; i < elems.length; i++) {
        elems[i].parentNode.removeChild(elems[i]);
      }

      expect(document.querySelectorAll(".test-class").length).toEqual(0);
    });

    it("do the same thing using jQuery", function () {
      // This is way simpler than the native DOM method. This is because
      // jQuery does a very interesting thing. All its methods work on
      // collections, not on individual elements. In this case `remove`
      // is called on what would represent the whole collection of elements
      // with the "test-class" class. If you want to remove a single element
      // then you have to transform that collection into a single element
      // collection using `.eq(i)`. Notice also that because of this behaviour
      // calling such a method on an empty collection won't produce an error.
      $(".test-class").remove();

      expect(document.querySelectorAll(".test-class").length).toEqual(0);
    });
  });

  describe("reading attributes", function () {
    it("using native DOM", function () {
      var div = document.querySelector("#some-div");
      expect(div.getAttribute("title")).toEqual("this is some-div");
    });

    it("using jQuery", function () {
      expect($("#some-div").attr("title")).toEqual("this is some-div");
    });
  });

  describe("setting attributes", function () {
    it("using native DOM", function () {
      var div = document.querySelector("#some-div");

      expect(div.getAttribute("title")).toEqual("this is some-div");
      div.setAttribute("title", "title from test");
      expect(div.getAttribute("title")).toEqual("title from test");
    });

    it("using jQuery", function () {
      expect($("#some-div").attr("title")).toEqual("this is some-div");
      $("#some-div").attr("title", "title from test");
      expect($("#some-div").attr("title")).toEqual("title from test");
    });
  });

  describe("removing attributes", function () {
    it("using native DOM", function () {
      var div = document.querySelector("#some-div");

      expect(div.getAttribute("title")).toEqual("this is some-div");
      div.removeAttribute("title");
      expect(div.getAttribute("title")).toEqual(null);
    });

    it("using jQuery", function () {
      expect($("#some-div").attr("title")).toEqual("this is some-div");
      $("#some-div").removeAttr("title");
      expect($("#some-div").attr("title")).toEqual(null);
    });
  });
});
