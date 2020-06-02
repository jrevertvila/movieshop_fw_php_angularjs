(function() {
    'use strict';
  
    movieshop.controller('menu', AppCtrl);
  
    function AppCtrl($scope) {
      $scope.currentNavItem = 'page1';
      $scope.goto = function(page) {
        $scope.status = "Goto " + page;
      };
    }
  })();