class HeroesListDirective {
  /*@ngInject*/
  constructor() {
    this.restrict = 'A';
    this.scope = {};
    this.require = 'ngModel';
  }

  link(scope, element, attrs, ctrl) {
  }
}


angular
  .module("hots")
  .directive("heroesList", HeroesListDirective)
