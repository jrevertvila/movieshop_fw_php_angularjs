movieshop.controller('loginCtrl', ["$scope","services","$css",function($scope,services,$css){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);

}]);