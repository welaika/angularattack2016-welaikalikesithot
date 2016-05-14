class MainController {
  /*@ngInject*/
  constructor($log, HeroesRepoService) {
    this.currentTab = 'allies';
    this.heroList = {};

    HeroesRepoService.getHeroes()
      .then((response) => {
        this.heroList = response.data.map((hero) => {
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
  }

  selectedHeroCount(team) {
    return this.heroList.filter((hero) => hero.selected[team]).length
  }

  isTabVisible(tabName) {
    return tabName === this.currentTab;
  }

  setCurrentTab(tabName) {
    this.currentTab = tabName;
  }
}

angular
  .module('hots')
  .controller('MainController', MainController);
