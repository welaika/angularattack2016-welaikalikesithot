class HeroesRepoService {
    constructor($http, API) {
        this.$http = $http;
        this.API = API;
    }
    getHeroes() {
      return this.$http.get(this.API.endpoint)
    }
}

angular
  .module('hots')
  .factory('HeroesRepoService', (() => {
    let fn = ($http, API) => new HeroesRepoService($http, API);
    fn.$inject = HeroesRepoService.$inject;
    return fn;
  })())
