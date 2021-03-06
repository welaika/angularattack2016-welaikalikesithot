class HeroSearchDirective {
  /*@ngInject*/
  constructor() {
    this.restrict = 'A'
    this.scope = {
      searchText: "=",
      heroList: "=",
      filteredHeroList: "="
    }
  }

  link(scope, element, attrs, ctrl) {
    scope.$watch('searchText', () =>{
      if (!scope.heroList.length > 0){ return }
      if (scope.searchText == undefined || scope.searchText.length == 0) {
        scope.filteredHeroList = scope.heroList;
      }

      let regex = new RegExp('^' + scope.searchText + '', 'i')
      scope.filteredHeroList = scope.heroList.filter((hero) => hero.name.match(regex) )
      scope.$applyAsync()
    })
  }
}


angular
  .module("hots")
  .directive("heroSearch", (() => {
    let fn = () => new HeroSearchDirective();
    fn.$inject = HeroSearchDirective.$inject;
    return fn;
  })())
