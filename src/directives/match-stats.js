class MatchStatsDirective{
  constructor() {
    this.restrict = 'A'
    this.scope = {
      alliesHeroes: '@',
      enemiesHeroes: '@',
      stats: "="
    }
  }

  link(scope, element, attrs, ctrl) {
    scope.$watch('alliesHeroes',
      () => {
        scope.stats['allies'] = getStatsFor(scope.alliesHeroes)
      }
    )

    scope.$watch('enemiesHeroes',
      () => {
        scope.stats['enemies'] = getStatsFor(scope.enemiesHeroes)
      }
    )



    function getStatsFor(heroes) {
      let addedRatings = {}
      let ratings = getRatingsForHeroes(heroes)
      addedRatings.complexity = addedRateFor(ratings, 'complexity')
      addedRatings.damage = addedRateFor(ratings, 'damage')
      addedRatings.survivability = addedRateFor(ratings, 'survivability')
      addedRatings.utility = addedRateFor(ratings, 'utility')
      return addedRatings
    }

    function addedRateFor(ratings, rate_key) {
      return ratings.map((rate) => rate[rate_key]).reduce((val, sum) => val + sum, 0)
    }

    function getRatingsForHeroes(heroes) {
      return angular.fromJson(heroes).map((hero) => hero.ratings)
    }
  }

}

angular
  .module("hots")
  .directive("matchStats", (() => {
    let fn = () => new MatchStatsDirective();
    fn.$inject = MatchStatsDirective.$inject;
    return fn;
  })())
