angular
  .module('hots')
  .filter('imageName', function() {
      return function(input) {
        if (input === "Anub'arak") return "anubarak"
        if (input === "Butcher") return "the-butcher"
        if (input === "E.T.C.") return "etc"
        if (input === "Kael'thas") return "kaelthas"
        if (input === "Li Li") return "li-li"
        if (input === "The Lost Vikings") return "the-lost-vikings"
        if (input === "Lt. Morales") return "lt-morales"
        if (input === "Sgt. Hammer") return "sgt-hammer"
        return input
      }
    }
  )
