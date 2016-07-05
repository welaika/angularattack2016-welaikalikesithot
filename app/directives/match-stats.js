'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MatchStatsDirective = function () {
  function MatchStatsDirective() {
    _classCallCheck(this, MatchStatsDirective);

    this.restrict = 'A';
    this.scope = {
      alliesHeroes: '@',
      enemiesHeroes: '@',
      stats: "="
    };
  }

  _createClass(MatchStatsDirective, [{
    key: 'link',
    value: function link(scope, element, attrs, ctrl) {
      var stun_array = ['stunning', 'they are stunned', 'Stun the first enemy', 'stun target enemy', 'stun the target'];

      scope.$watch('alliesHeroes', function () {
        scope.stats = getHeroesStats();
      });

      scope.$watch('enemiesHeroes', function () {
        scope.stats = getHeroesStats();
      });

      function getHeroesStats() {
        var heroes_stats = {};

        heroes_stats['allies'] = addedRatingsFor(scope.alliesHeroes);
        heroes_stats['enemies'] = addedRatingsFor(scope.enemiesHeroes);

        var result = Object.entries(heroes_stats.allies).reduce(function (memo, rate) {
          var _rate = _slicedToArray(rate, 2);

          var rate_key = _rate[0];
          var value = _rate[1];

          memo[rate_key] = {};

          var array = ['allies', 'enemies'];
          array.forEach(function (team) {
            memo[rate_key][team] = ratePercentage(heroes_stats, team, rate_key);
          });

          return memo;
        }, {});
        return result;
      }

      function ratePercentage(heroes_stats, team, rate_key) {
        return heroes_stats[team][rate_key] / (heroes_stats.allies[rate_key] + heroes_stats.enemies[rate_key]) * 100;
      }

      function addedRatingsFor(heroes) {
        var addedRatings = {};
        var ratings = getRatingsForHeroes(heroes);
        var stats = getStatsForHeroes(heroes);
        addedRatings.stunners = getStunners(heroes).length;
        addedRatings.complexity = addedRateFor(ratings, 'complexity');
        addedRatings.damage = addedRateFor(ratings, 'damage');
        addedRatings.survivability = addedRateFor(ratings, 'survivability');
        addedRatings.utility = addedRateFor(ratings, 'utility');
        addedRatings.hp = addedRateFor(stats, 'hp');
        addedRatings.hpRegen = addedRateFor(stats, 'hpRegen');

        var entries = Object.entries(addedRatings);
        var sum = 0;
        entries.forEach(function (entry) {
          sum = sum + entry[1];
        });

        addedRatings.average = sum / 7;
        return addedRatings;
      }

      function addedRateFor(ratings, rate_key) {
        return ratings.map(function (rate) {
          return rate[rate_key];
        }).reduce(function (val, sum) {
          return val + sum;
        }, 0);
      }

      function getRatingsForHeroes(heroes) {
        return angular.fromJson(heroes).map(function (hero) {
          return hero.ratings;
        });
      }

      function getStatsForHeroes(heroes) {
        // hard fix for last vikings
        return angular.fromJson(heroes).map(function (hero) {
          return hero.stats[hero.id] || hero.stats['HeroOlaf'];
        });
      }

      function getAbilitiesDescription(hero) {
        return hero.abilities[hero.id].map(function (ability) {
          return ability.description;
        });
      }

      function getHeroesAbilities(heroes) {
        var abilities = [];
        angular.fromJson(heroes).forEach(function (hero) {
          abilities.push({ id: hero.id, descriptions: getAbilitiesDescription(hero) });
        });
        return abilities;
      }

      function getStunners(heroes) {
        var heroes_array = [];
        var stunners = [];
        getHeroesAbilities(heroes).forEach(function (hero) {
          heroes_array.push({ id: hero.id, is_stunner: isStunner(hero.descriptions) });
        });
        heroes_array.forEach(function (heroes_filtered) {
          if (heroes_filtered.is_stunner === true) {
            stunners.push(heroes_filtered.id);
          }
        });
        return stunners;
      }

      function isStunner(hero_descriptions) {
        var is_stunner = false;
        hero_descriptions.forEach(function (description) {
          if (new RegExp(stun_array.join("|")).test(description)) {
            is_stunner = true;
            return true;
          }
        });
        return is_stunner;
      }
    }
  }]);

  return MatchStatsDirective;
}();

angular.module("hots").directive("matchStats", function () {
  var fn = function fn() {
    return new MatchStatsDirective();
  };
  fn.$inject = MatchStatsDirective.$inject;
  return fn;
}());