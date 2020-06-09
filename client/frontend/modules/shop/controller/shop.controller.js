movieshop.controller('shopCtrl', ["$scope","$window","services","$css","getAllMovies","getAllGenres",function($scope,$window,services,$css,getAllMovies,getAllGenres){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);

    var allMovies = getAllMovies;
    
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
    // console.log(getAllGenres);
    getAllGenres.forEach(function (element) {
        element.selected = false;
    });
    $scope.genres = getAllGenres;

    //change filter

    $scope.switchFilter = function() {
        filter = $scope.selected;
        allMovies = allMovies.sort(dynamicSort(filter));
        // console.log(allMovies);
        $scope.currentPage = 1;
        setPagingData($scope.currentPage);
        // $scope.$apply();
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
            allMovies = getAllMovies
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
        $window.location.href = "#shop/"+data.delegateTarget.id;
    }

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