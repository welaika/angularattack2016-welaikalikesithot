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
        scope.stats = getHeroesStats()
      }
    )

    scope.$watch('enemiesHeroes',
      () => {
        scope.stats = getHeroesStats()
      }
    )

    function getHeroesStats() {
      let heroes_stats = {}
      heroes_stats['allies'] = addedRatingsFor(scope.alliesHeroes)
      heroes_stats['enemies'] = addedRatingsFor(scope.enemiesHeroes)

      let complexity_values = ratePercentage(heroes_stats, 'complexity')
      heroes_stats['allies']['complexity'] = complexity_values['allies']
      heroes_stats['enemies']['complexity'] = complexity_values['enemies']

      let damage_values = ratePercentage(heroes_stats, 'damage')
      heroes_stats['allies']['damage'] = damage_values['allies']
      heroes_stats['enemies']['damage'] = damage_values['enemies']

      let survivability_values = ratePercentage(heroes_stats, 'survivability')
      heroes_stats['allies']['survivability'] = survivability_values['allies']
      heroes_stats['enemies']['survivability'] = survivability_values['enemies']

      let utility_values = ratePercentage(heroes_stats, 'utility')
      heroes_stats['allies']['utility'] = utility_values['allies']
      heroes_stats['enemies']['utility'] = utility_values['enemies']

      return heroes_stats
    }

    function ratePercentage(collection, rate_key) {
      let values =  {}
      values['allies'] = (collection['allies'][rate_key] / (collection['allies'][rate_key] + collection['enemies'][rate_key])) * 100
      values['enemies'] = (collection['enemies'][rate_key] / (collection['allies'][rate_key] + collection['enemies'][rate_key])) * 100
      return values
    }

    function addedRatingsFor(heroes) {
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
