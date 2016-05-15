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

      let result = Object.entries(heroes_stats.allies).reduce((memo, rate)=>{
        let [rate_key, value] = rate
        memo[rate_key] = {}

        let array = ['allies', 'enemies']
        array.forEach((team) => {
          memo[rate_key][team] = ratePercentage(heroes_stats, team, rate_key)
        })

        return memo
      }, {})

      return result
    }

    function ratePercentage(heroes_stats, team, rate_key) {
      return (heroes_stats[team][rate_key] / (heroes_stats.allies[rate_key] + heroes_stats.enemies[rate_key])) * 100
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
