'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MobileInput = function () {
  /*@ngInject*/

  function MobileInput(scroller) {
    _classCallCheck(this, MobileInput);

    this.restrict = 'A';
  }

  _createClass(MobileInput, [{
    key: 'link',
    value: function link(scope, element, attrs, ctrl) {
      element.on('focus', function (event) {
        scroller.scrollToElement(event.target);
      });
    }
  }]);

  return MobileInput;
}();

angular.module("hots").directive("mobileInput", function () {
  var fn = function fn() {
    return new MobileInput();
  };
  fn.$inject = MobileInput.$inject;
  return fn;
}());