class FallbackImageSrc {
  /*@ngInject*/
  constructor() {
    this.restrict = 'A'
  }

  link(scope, element, attrs, ctrl) {
    iElement.bind('error', function() {
      angular.element(this).attr("src", iAttrs.fallbackSrc);
    });
  }
}


angular
  .module("hots")
  .directive("fallbackImageSrc", (() => {
    let fn = () => new FallbackImageSrc();
    fn.$inject = FallbackImageSrc.$inject;
    return fn;
  })())
