'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = function () {
  /*@ngInject*/

  function MainController($log, HeroesRepoService) {
    var _this = this;

    _classCallCheck(this, MainController);

    this.currentTab = 'allies';
    this.heroList = {};
    this.searchText = undefined;
    this.filteredHeroList = {};
    this.stats = { allies: { complexity: 0, damage: 0, survivability: 0, utility: 0, hp: 0, hpRegen: 0 }, enemies: { complexity: 0, damage: 0, survivability: 0, utility: 0, hp: 0, hpRegen: 0 } };

    if (navigator.onLine) {
      HeroesRepoService.getHeroes().then(function (response) {
        localStorage.setItem('heroes_json', JSON.stringify(response));
        _this.filteredHeroList = _this.heroList = response.data.map(function (hero) {
          return Object.assign(hero, {
            selected: {
              allies: false,
              enemies: false
            }
          });
        });
      }).catch(function (response) {
        $log.error('Error fetching heroes list: ' + response.status + ' status code');
      });
    } else {
      var cached_heroes_data = JSON.parse(localStorage.getItem('heroes_json'));
      this.heroList = cached_heroes_data.data.map(function (hero) {
        return Object.assign(hero, {
          selected: {
            allies: false,
            enemies: false
          }
        });
      });
    }
  }

  _createClass(MainController, [{
    key: 'selectedHero',
    value: function selectedHero(team) {
      if (this.heroList.length > 0) return this.heroList.filter(function (hero) {
        return hero.selected[team];
      });else return [];
    }
  }, {
    key: 'isTabVisible',
    value: function isTabVisible(tabName) {
      return tabName === this.currentTab;
    }
  }, {
    key: 'setCurrentTab',
    value: function setCurrentTab(tabName) {
      this.currentTab = tabName;
    }
  }]);

  return MainController;
}();

angular.module('hots').controller('MainController', MainController);