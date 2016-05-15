let scroller = {
    scrollToElement: (element) => {
      scroller.scrollTo(scroller.getElementYPos(element))
    },

    getElementYPos: (element) => {
      return element.offsetTop
    },

    scrollTo: (y, x = 0) => {
      window.scrollTo(x, y)
    }
}


angular
  .module('hots')
  .factory('scroller', scroller)
