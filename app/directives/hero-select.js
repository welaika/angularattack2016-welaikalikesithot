'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeroSelectDirective = function () {
  /*@ngInject*/

  function HeroSelectDirective() {
    _classCallCheck(this, HeroSelectDirective);

    this.restrict = 'A';
    this.scope = {
      selected: '=',
      heroSelect: '@'
    };
  }

  _createClass(HeroSelectDirective, [{
    key: 'link',
    value: function link(scope, element, attrs, ctrl) {
      element.on('click', toggleSelect);

      function toggleSelect() {
        if (scope.heroSelect >= 5 && !scope.selected) {
          return undefined;
        }

        scope.selected = !scope.selected;
        scope.$applyAsync();
      }
    }
  }]);

  return HeroSelectDirective;
}();

angular.module("hots").directive("heroSelect", function () {
  var fn = function fn() {
    return new HeroSelectDirective();
  };
  fn.$inject = HeroSelectDirective.$inject;
  return fn;
}());