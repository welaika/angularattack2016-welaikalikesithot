class MainController {
  /*@ngInject*/
  constructor($log, HeroesRepoService) {
    this.heroList = {}
    HeroesRepoService.getHeroes()
      .then((response) => {
        this.heroList = response.data
      })
      .catch((response) => {
        $log.error(`Error fetching heroes list: ${response.status} status code`)
      })

  }
}

angular
  .module('hots')
  .controller('MainController', MainController);
