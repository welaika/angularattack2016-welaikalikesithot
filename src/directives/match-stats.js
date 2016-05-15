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
    var stun_array = ['stunning', 'they are stunned', 'Stun the first enemy', 'stun target enemy', 'stun the target']

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
      addedRatings.stunners = getStunners(heroes).length
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

    function getAbilitiesDescription(hero) {
      return hero.abilities[hero.id].map((ability) => ability.description)
    }

    function getHeroesAbilities(heroes) {
      var abilities = []
      angular.fromJson(heroes).forEach(function (hero) { abilities.push({ id: hero.id, descriptions: getAbilitiesDescription(hero)}) })
      return abilities
    }

    function getStunners(heroes) {
      var heroes_array = []
      var stunners = []
      getHeroesAbilities(heroes).forEach(function(hero) {
        heroes_array.push({ id: hero.id, is_stunner: isStunner(hero.descriptions)})
      })
      heroes_array.forEach(function(heroes_filtered) {
        if(heroes_filtered.is_stunner === true) {
          stunners.push(heroes_filtered.id)
        }
      })
      return stunners
    }

    function isStunner(hero_descriptions) {
      var is_stunner = false
      hero_descriptions.forEach(function (description) {
        if (new RegExp(stun_array.join("|")).test(description)) {
          is_stunner = true
          return true
        }
      })
      return is_stunner
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
