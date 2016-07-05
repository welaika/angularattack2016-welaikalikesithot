'use strict';

var scroller = {
  scrollToElement: function scrollToElement(element) {
    scroller.scrollTo(scroller.getElementYPos(element));
  },

  getElementYPos: function getElementYPos(element) {
    return element.offsetTop;
  },

  scrollTo: function scrollTo(y) {
    var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    window.scrollTo(x, y);
  }
};

angular.module('hots').factory('scroller', scroller);