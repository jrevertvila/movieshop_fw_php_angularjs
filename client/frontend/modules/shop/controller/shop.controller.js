movieshop.controller('shopCtrl', ["$scope","$window","services","$rootScope","$css","getAllMovies","getAllGenres",function($scope,$window,services,$rootScope,$css,getAllMovies,getAllGenres){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);

    
    // console.log($rootScope.getAllMovies);
    // console.log($rootScope.getAllGenres);

    var allMovies = getAllMovies;
    var allGenres = getAllGenres;

    //console.log(allMovies.sort(dynamicSort("-title")));
    $scope.totalItems = allMovies.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 12;

    $scope.$watch("currentPage", function() {
        setPagingData($scope.currentPage);
    });

    function setPagingData(page) {
        // console.log(allMovies);
        var pagedData = allMovies.slice((page - 1) * $scope.itemsPerPage,page * $scope.itemsPerPage);
        $scope.pagedMovies = pagedData;
        // console.log($scope.pagedMovies);
    }
    // console.log(allGenres);
    allGenres.forEach(function (element) {
        element.selected = false;
    });
    $scope.genres = allGenres;

    //change filter

    $scope.switchFilter = function() {
        filter = $scope.selected;
        allMovies = allMovies.sort(dynamicSort(filter));
        // console.log(allMovies);
        $scope.currentPage = 1;
        setPagingData($scope.currentPage);
        // $scope.$apply();
    }

    $scope.removeFilters = function() {
        localStorage.removeItem("searchText");
        localStorage.removeItem("selectedGenres");
        $rootScope.searchText = "";
        allMovies = getAllMovies;
        $scope.currentPage = 1;
        setPagingData($scope.currentPage);
    }

    if(localStorage.getItem("searchText") !== null && localStorage.getItem("searchText") != ""){
        // console.log("ENTRA EN SEARCH TEXT");
        searchMovies = [];
        allMovies.forEach(function (movie) {   
            // console.log(movie.title);    
            title = movie.title.toLowerCase();
            if(title.includes(localStorage.getItem("searchText").toLowerCase())){
                searchMovies.push(movie);
            }
        });

        allMovies = searchMovies;
        // console.log(allMovies);
        $scope.currentPage = 1;
        setPagingData($scope.currentPage);

    }else{
        if(localStorage.getItem("selectedGenres") !== null && localStorage.getItem("selectedGenres") != ""){
            selectedGenres = localStorage.getItem("selectedGenres").split(",");
            // selectedGenresArr = localStorage.getItem("selectedGenres").split(",");
            // console.log("not null");
    
            services.get('shop','getAllMoviesByGenres',selectedGenres).then(function (response) {
                allMovies = response;
                // console.log(response);
                $scope.currentPage = 1;
                setPagingData($scope.currentPage);
            });
            // console.log(selectedGenres);
            // selectedGenres.forEach(function (id) {            
            //     var result = $scope.genres.filter(obj => { return obj.id === id })
            //     $scope.selected_genres.push(result[0]);
            //     console.log(result[0]);
            // });
    
        }
    }
    
    

    //SELECT GENRES AND LOAD MOVIES

    $scope.selected_genres = [];

    $scope.addGenre = function(genre){
        var index = $scope.selected_genres.indexOf(genre.id);
        if(index == -1 && genre.selected){
            $scope.selected_genres.push(genre.id);
        } else if (!genre.selected && index != -1){
            $scope.selected_genres.splice(index, 1);
        }
        finalGenres = $scope.selected_genres.join(",");
        

        if($scope.selected_genres.length == 0){
            allMovies = getAllMovies;
            console.log(allMovies);
            $scope.currentPage = 1;
            setPagingData($scope.currentPage);
        }else{
            services.get('shop','getAllMoviesByGenres',finalGenres).then(function (response) {
                allMovies = response;
                console.log(response);
                $scope.currentPage = 1;
                setPagingData($scope.currentPage);
            });
        }
        $scope.selected = false;
    }

    $scope.details = function(data){
        console.log(data.delegateTarget.id);
        showDetails.film(data.delegateTarget.id);
        // $window.location.href = "#shop/"+data.delegateTarget.id;
    }

    // selectedGenres = localStorage.getItem("selectedGenres").split(",");

    angular.forEach($scope.genres, function (item) {
        if ($scope.selected_genres.indexOf(item.id) > -1) {
            item.checked = true;
        }
    });

}]);

//SORT OBJECT ARRAY BY PROPERTY

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}