class HeroesRepoService {
    /*@ngInject*/
    constructor($http, API) {
        this.$http = $http;
        this.API = API;
    }
    getHeroes() {
    }
}

angular
  .module('hots')
  .factory('HeroesRepoService', HeroesRepoService)
