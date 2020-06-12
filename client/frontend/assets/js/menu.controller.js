// (function() {
//     'use strict';
  
//     movieshop.controller('menu', AppCtrl);
  
//     function AppCtrl($scope) {
//       $scope.currentNavItem = 'page1';
//       $scope.goto = function(page) {
//         $scope.status = "Goto " + page;
//       };
//     }
//   })();

movieshop.controller('menuCtrl', ["$scope","services","$document",function($scope,services,$document){
  if (localStorage.getItem('authToken')!==null && localStorage.getItem('authToken')!= ""){
    $scope.profile_header_avatar = {'background-image':'url(' + localStorage.getItem('user_avatar') + ')'}
    $scope.logged = true;
  }else{
    $scope.logged = false;
  }

  $scope.toggleProfileBtn = function(){
    
    console.log(angular.element(dropbtn).hasClass('toggled'));
    if (angular.element(dropbtn).hasClass('toggled')){
      $scope.addToggle = "";
      $scope.addShow = "";
    }else{
      $scope.addToggle = "toggled";
      $scope.addShow = "show";
    }
    
  };

  $scope.logout = function(){
    localStorage.removeItem('user_avatar');
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  $document.bind('click', function(event){
    if (angular.element(dropbtn).hasClass('toggled')){
      $scope.addToggle = "";
      $scope.addShow = "";
    }
  });
}]);