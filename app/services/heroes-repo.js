'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeroesRepoService = function () {
  function HeroesRepoService($http, API) {
    _classCallCheck(this, HeroesRepoService);

    this.$http = $http;
    this.API = API;
  }

  _createClass(HeroesRepoService, [{
    key: 'getHeroes',
    value: function getHeroes() {
      return this.$http.get(this.API.endpoint);
    }
  }]);

  return HeroesRepoService;
}();

angular.module('hots').factory('HeroesRepoService', function () {
  var fn = function fn($http, API) {
    return new HeroesRepoService($http, API);
  };
  fn.$inject = HeroesRepoService.$inject;
  return fn;
}());