class MainController {
  /*@ngInject*/
  constructor($log, HeroesRepoService) {
    this.currentTab = 'allies';
    this.heroList = {};
    HeroesRepoService.getHeroes()
      .then((response) => {
        this.heroList = response.data.map((hero) => {
          hero.selected = {
            allies: false,
            enemies: false
          }
          return hero
        })
      })
      .catch((response) => {
        $log.error(`Error fetching heroes list: ${response.status} status code`)
      })
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
