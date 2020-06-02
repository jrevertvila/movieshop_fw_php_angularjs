var movieshop = angular.module('movieshop', ['ngRoute','ngMaterial','angularCSS']);
movieshop.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {
        $routeProvider
                               
                .when("/", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})

                .when("/home", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "homeCtrl"})

                .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})
                
                .otherwise("/", {redirectTo: '/'});
    }]);