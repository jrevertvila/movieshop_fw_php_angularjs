movieshop.controller('shopDetailsCtrl', ["$scope","services","$css","getMovie",function($scope,services,$css,getMovie){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);

    $scope.movie = getMovie[0];
    console.log($scope.movie);
}]);