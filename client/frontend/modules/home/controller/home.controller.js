movieshop.controller('homeCtrl', ["$scope","services","$css","rated_movies","visited_movies","visited_genres","showDetails",function($scope,services,$css,rated_movies,visited_movies,visited_genres,showDetails){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.remove('/movieshop_fw_php_angularjs/client/frontend/modules/home/controller/test.js');

	// localStorage.removeItem('searchText');

	$scope.rated_movies = rated_movies;
	$scope.most_viewed_movies = visited_movies;
	$scope.genres = visited_genres;
	$scope.totalDisplayed = 3;
	$scope.genresLength = $scope.genres.length;

	getApiMovies("The lord of the rings").then(function(data){
		console.log(data.Search);
		$scope.api_movies = data.Search;
	});
	
	$scope.goToDetails = function(data){
		console.log(data);
        showDetails.film(data.currentTarget.id);
     }

	//SCROLL
	window.onscroll = function() {
		if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
			if ($scope.totalDisplayed < $scope.genresLength){
				$scope.totalDisplayed = $scope.totalDisplayed +3;
				console.log($scope.totalDisplayed);
				$scope.$apply();
			}
			
		}
	};
}]);


var getApiMovies = function(urlTitle) {
    title = urlTitle.split(' ').join('+');
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'GET',
            url: 'http://www.omdbapi.com/?s='+title+'&apikey='+API_OMDb+'&plot=full',
            dataType: 'json',
        })
        .done(function(data){
            // console.log(data);
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}