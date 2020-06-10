movieshop.controller('searchCtrl', ["$scope","$css","services","$rootScope","$window","DataTransfer","showDetails",function($scope,$css,services,$rootScope,$window,DataTransfer,showDetails){
    $css.add(['/movieshop_fw_php_angularjs/client/frontend/modules/shop/controller/shop.controller.js']);

    //MAIN VARS
    // var allMovies = [];
    // var getAllGenres = [];

    // services.get('shop','getAllMovies').then(function(data){
    //     allMovies = data;
    // });
    // services.get('shop','getAllGenres').then(function(data){
    //     getAllGenres = data;
    // });
    var allMovies = $rootScope.getAllMovies;
    var getAllGenres = $rootScope.getAllGenres;
    
    if (localStorage.getItem('searchText') !== null){
        $scope.searchText = localStorage.getItem('searchText');
    }
    
    //DROPDOWN GENRES SEARCH BAR

    $scope.genresDropdown = [];

    for (i = 0; i < getAllGenres.length; i++) {
        item = {
            "label": getAllGenres[i].genre,
            "id": getAllGenres[i].id
        };
        $scope.genresDropdown.push(item);
    }

    $scope.selectedGenres = [];

    $scope.settings = {
        scrollableHeight: '400px',
        scrollable: true,
        enableSearch: true
    };

    //END DROPDOWN

    //SHOW/LOAD MOVIES ON KEY PRESSED
    $scope.fetchMovies = function(){
        
        $scope.searchedMovies = [];
        count = 0;

        if($scope.searchText !== undefined){
            searchText = $scope.searchText.toLowerCase();

            if(searchText == ""){
                $scope.searchedMovies = [];
            }else{
                for (var i = 0; i < allMovies.length; i++) {
                    title = allMovies[i].title.toLowerCase();
                    if(title.includes(searchText)){
                        // console.log(allMovies[i].title);
                        $scope.searchedMovies.push(allMovies[i]);
                        count++;
                    }
        
        
                    if(count == 5){
                        break;
                    }
                 }
                //  console.log($scope.searchedMovies);
            }
        }
     }
     //END LOAD MOVIES SEARCH BAR

     //GO TO DETAILS MOVIE
    $scope.goToDetails = function(data){
        // $window.location.href = "#shop/"+data.currentTarget.id;
        showDetails.film(data.currentTarget.id);
        $scope.searchText = "";
    }
    //END GO TO DETAILS

    //GO TO SHOP
    $scope.goToShop = function(){
        var strGenres = $scope.selectedGenres.map(function(elem){
            return elem.id;
        }).join(",");
        console.log(strGenres);
        console.log($scope.searchText);
        if($scope.searchText !== undefined && $scope.searchText != ""){
            console.log("NO ES UNDEFINED");
            localStorage.removeItem('selectedGenres');
            localStorage.setItem('searchText',$scope.searchText);
            $window.location.href = "#shop";
        }else{
            console.log("ES UNDEFINED");
            if ($scope.selectedGenres.length != 0){
                localStorage.setItem('selectedGenres',strGenres);
            }else{
                localStorage.removeItem('selectedGenres');
            }
            localStorage.removeItem('searchText');
            $window.location.href = "#shop";
        }
        $scope.searchText = "";
    }
    //END GO TO SHOP
     

    // console.log("CONTROLADOR SEARCH");
    // init();

    // $async(function*() {
    //     services.get('shop','getAllMovies').then(function(data){
    //         DataTransfer.setAllMovies(data);
    //         console.log("setted");
            
    //     });
    // });
    // services.get('shop','getAllMovies').then(function(data){
    //     DataTransfer.setAllMovies(data);
    //     console.log("setted");
        
    // });
    // async function init() { 
    //     services.get('shop','getAllMovies').then(function(data){
    //         DataTransfer.setAllMovies(data);
    //         console.log("setted");
    //     });
    // };

    // services.get('shop','getAllMovies').then(function(data){
    //     DataTransfer.setAllMovies(data);
    //     console.log("setted");
    //     console.log(DataTransfer.getAllMovies());
    // });

    $scope.test = function() {
        console.log("DENTRO FUNCION");
        console.log($scope.selectedGenres);
    }


}]);