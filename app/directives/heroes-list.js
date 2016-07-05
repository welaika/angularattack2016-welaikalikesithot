"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeroesListDirective = function () {
  /*@ngInject*/

  function HeroesListDirective() {
    _classCallCheck(this, HeroesListDirective);

    this.restrict = 'A';
    this.scope = {};
  }

  _createClass(HeroesListDirective, [{
    key: "link",
    value: function link(scope, element, attrs, ctrl) {}
  }]);

  return HeroesListDirective;
}();

angular.module("hots").directive("heroesList", function () {
  var fn = function fn() {
    return new HeroesListDirective();
  };
  fn.$inject = HeroesListDirective.$inject;
  return fn;
}());