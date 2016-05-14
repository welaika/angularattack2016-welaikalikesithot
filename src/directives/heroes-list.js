class HeroesListDirective {
  /*@ngInject*/
  constructor() {
    this.restrict = 'A'
    this.scope = {}
  }

  link(scope, element, attrs, ctrl) {
  }
}


angular
  .module("hots")
  .directive("heroesList", (() => {
    let fn = () => new HeroesListDirective();
    fn.$inject = HeroesListDirective.$inject;
    return fn;
  })())
