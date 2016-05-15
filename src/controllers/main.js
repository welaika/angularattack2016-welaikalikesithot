class MainController {
  /*@ngInject*/
  constructor($log, HeroesRepoService) {
    this.currentTab = 'allies'
    this.heroList = {}
    this.searchText = undefined
    this.filteredHeroList = {}
    this.stats = { allies: {complexity: 0, damage: 0, survivability: 0, utility: 0, hp: 0, hpRegen: 0}, enemies: {complexity: 0, damage: 0, survivability: 0, utility: 0, hp: 0, hpRegen: 0} }

    if(navigator.onLine) {
      HeroesRepoService.getHeroes()
        .then((response) => {
          localStorage.setItem('heroes_json', JSON.stringify(response));
          this.filteredHeroList = this.heroList = response.data.map((hero) => {
            return Object.assign(hero, {
              selected: {
                allies: false,
                enemies: false
              }
            });
          })
        })
        .catch((response) => {
          $log.error(`Error fetching heroes list: ${response.status} status code`)
        })
    } else {
      let cached_heroes_data = JSON.parse(localStorage.getItem('heroes_json'));
      this.heroList = cached_heroes_data.data.map((hero) => {
        return Object.assign(hero, {
          selected: {
            allies: false,
            enemies: false
          }
        });
      })
    }
  }

  selectedHero(team) {
    if (this.heroList.length > 0)
      return this.heroList.filter((hero) => hero.selected[team])
    else
      return []
  }

  isTabVisible(tabName) {
    return tabName === this.currentTab;
  }

  setCurrentTab(tabName) {
    this.currentTab = tabName;
  }

  search(needle = this.searchText) {
    if (needle.length == 0) {
      this.filteredHeroList = this.heroList;
    }

    let regex = new RegExp('^' + this.searchText + '', 'i')
    this.filteredHeroList = this.heroList.filter((hero) => hero.name.match(regex) )
  }
}

angular
  .module('hots')
  .controller('MainController', MainController);
