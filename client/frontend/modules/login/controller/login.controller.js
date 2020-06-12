movieshop.controller('loginCtrl', ["$scope","services","$css",function($scope,services,$css){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);

	if (localStorage.getItem('authToken')!==null && localStorage.getItem('authToken')!= ""){
		location.href='#home';
		window.location.reload();
	}

	$scope.login = {
        email: "jrevertvila@gmail.com",
        passwd: "1234"
	};

	$scope.validation = false;
	
	$scope.submitLogin = function () {
        var data = {
            "email": $scope.login.email, 
            "passwd": $scope.login.passwd
        };
		
		services.post('login','loginUser',data).then(function(data){
			console.log(data);
			if(data.result){
				$scope.validation = false;
				localStorage.setItem('authToken',data.token);
				localStorage.setItem('user_avatar',data.avatar);
				location.href='#home';
				window.location.reload();
			}else{
				$scope.validation = true;			
			}
		});

        console.log(data);
        console.log("click");
	};
	

}]);

movieshop.controller('registerCtrl', ["$scope","services","$css",function($scope,services,$css){
	$css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/style.css','/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
	$css.add(['/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css']);

	if (localStorage.getItem('authToken')!==null && localStorage.getItem('authToken')!= ""){
		location.href='#home';
		window.location.reload();
	}

	$scope.register = {
        username: "jiestacio",
		email: "joel.iestacio@gmail.com",
		passwd1: "1234",
		passwd2: "1234"
	};

	$scope.validation = false;
	
	$scope.submitRegister = function () {
        var data = {
			"username": $scope.register.username,
            "email": $scope.register.email, 
            "passwd": $scope.register.passwd1
        };
		
		services.post('login','createUser',data).then(function(data){
			console.log(data);
			// if(data.result){
			// 	$scope.validation = false;
			// 	localStorage.setItem('authToken',data.token);
			// 	localStorage.setItem('user_avatar',data.avatar);
			// 	location.href='#home';
			// 	window.location.reload();
			// }else{
			// 	$scope.validation = true;			
			// }
		});

        console.log(data);
	};
	

}]);