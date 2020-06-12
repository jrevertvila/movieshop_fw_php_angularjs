var movieshop = angular.module('movieshop', ['ngRoute','ngMaterial','angularCSS','ui.bootstrap','angularjs-dropdown-multiselect']);
movieshop.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {
        $routeProvider
                               
                .when("/", {redirectTo: '/home'})

                .when("/home", {
                        templateUrl: "frontend/modules/home/view/home.view.html", 
                        controller: "homeCtrl",
                        resolve: {
                                rated_movies: function (services) {
                                        return services.get('home','rated_movies');
                                },
                                visited_movies: function (services) {
                                        return services.get('home','visited_movies');
                                },
                                visited_genres: function (services) {
                                        return services.get('home','visited_genres');
                                }
                        }
                })

                .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html",controller: "contactCtrl"})

                .when("/shop", {
                        templateUrl: "frontend/modules/shop/view/shop.view.html",
                        controller: "shopCtrl",
                        resolve: {
                                getAllMovies: function (services) {
                                        return services.get('shop','getAllMovies');
                                },
                                getAllGenres: function (services) {
                                        return services.get('shop','getAllGenres');
                                }
                        }
                })

                .when("/shop/:id", {
                        templateUrl: "frontend/modules/shop/view/shop_details.view.html",
                        controller: "shopDetailsCtrl",
                        resolve: {
                                getMovie: function (services, $route) {
                                        // console.log(services.get('shop','getMovie',$route.current.params.id));
                                        return services.get('shop','getMovie',$route.current.params.id);
                                }
                        }
                })

                // .when("/shop/search/:id", {
                //         templateUrl: "frontend/modules/shop/view/shop_details.view.html",
                //         controller: "shopDetailsCtrl",
                //         resolve: {
                //                 getMovie: function (services, $route) {
                //                         // console.log(services.get('shop','getMovie',$route.current.params.id));
                //                         return services.get('shop','getMovie',$route.current.params.id);
                //                 }
                //         }
                // })

                .when("/login", {
                        templateUrl: "frontend/modules/login/view/login.view.html",
                        controller: "loginCtrl"
                })

                .when("/register", {
                        templateUrl: "frontend/modules/login/view/register.view.html",
                        controller: "registerCtrl"
                })

                .when("/login/active_user/:id", {
                        templateUrl: "frontend/modules/login/view/register.view.html",
                        controller: "activeUserCtrl",
                        resolve: {
                                activeUser: function (services, $route) {
                                        // services.post('login','active_user',$route.current.params.id).then(function(data){
                                        //         console.log(data);
                                        // });
                                        // console.log($route.current.params.id);
                                        return services.get('login','active_user',$route.current.params.id);
                                        // return services.post('login','active_user',$route.current.params.id);
                                        // return $route.current.params.id;
                                }
                        }
                })
                
                .otherwise("/", {redirectTo: '/'});
    }]);
        movieshop.run(function($rootScope,services) {
                services.get('shop','getAllMovies').then(function(data){
                        $rootScope.getAllMovies = data;
                });
                services.get('shop','getAllGenres').then(function(data){
                        $rootScope.getAllGenres = data;
                });
        });
