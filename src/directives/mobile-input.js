class MobileInput {
  /*@ngInject*/
  constructor(scroller) {
    this.restrict = 'A'
  }

  link(scope, element, attrs, ctrl) {
    element.on('focus', (event) => {
      scroller.scrollToElement(event.target)
    })
  }
}


angular
  .module("hots")
  .directive("mobileInput", (() => {
    let fn = () => new MobileInput();
    fn.$inject = MobileInput.$inject;
    return fn;
  })())
