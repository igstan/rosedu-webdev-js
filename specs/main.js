var createTestDomElement = function () {
  return jasmine.createSpyObj("DOM Element", ["addEventListener", "removeEventListener"]);
};

// Initialize Jasmine.
(function() {
  "use strict";

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }

    var cleanFixture = document.getElementById("clean-fixture").textContent;

    beforeEach(function () {
      var fixture = document.getElementById("fixture");
      fixture.innerHTML = cleanFixture;
    });

    jasmineEnv.execute();
  };
})();
