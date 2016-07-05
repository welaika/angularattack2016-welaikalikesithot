"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeroSearchDirective = function () {
  /*@ngInject*/

  function HeroSearchDirective() {
    _classCallCheck(this, HeroSearchDirective);

    this.restrict = 'A';
    this.scope = {
      searchText: "=",
      heroList: "=",
      filteredHeroList: "="
    };
  }

  _createClass(HeroSearchDirective, [{
    key: "link",
    value: function link(scope, element, attrs, ctrl) {
      scope.$watch('searchText', function () {
        if (!scope.heroList.length > 0) {
          return;
        }
        if (scope.searchText == undefined || scope.searchText.length == 0) {
          scope.filteredHeroList = scope.heroList;
        }

        var regex = new RegExp('^' + scope.searchText + '', 'i');
        scope.filteredHeroList = scope.heroList.filter(function (hero) {
          return hero.name.match(regex);
        });
        scope.$applyAsync();
      });
    }
  }]);

  return HeroSearchDirective;
}();

angular.module("hots").directive("heroSearch", function () {
  var fn = function fn() {
    return new HeroSearchDirective();
  };
  fn.$inject = HeroSearchDirective.$inject;
  return fn;
}());