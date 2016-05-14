class HeroSelectDirective {
  /*@ngInject*/
  constructor() {
    this.restrict = 'A'
    this.scope = {
      selected: '=',
      heroSelect: '@'
    }
  }

  link(scope, element, attrs, ctrl) {
    element.on('click', toggleSelect)

    function toggleSelect() {
      if (scope.heroSelect >= 5 && !scope.selected) {
        return undefined
      }

      scope.selected = !scope.selected
      scope.$applyAsync()
    }
  }
}


angular
  .module("hots")
  .directive("heroSelect", (() => {
    let fn = () => new HeroSelectDirective();
    fn.$inject = HeroSelectDirective.$inject;
    return fn;
  })())
