movieshop.factory("services", ['$http','$q', function ($http, $q) {
   //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var serviceBase = '/movieshop_fw_php_angularjs/client/backend/index.php?module=';
    var obj = {};

        obj.post = function (module, functi, dada) {
           console.log("in post");
          var defered=$q.defer();
          var promise=defered.promise;
          $http({
                method: 'POST',
                url: serviceBase + module + '&function=' + functi,
                data: dada
            }).success(function(data, status, headers, config) {
      	       console.log(serviceBase + module + '&function=' + functi);
               defered.resolve(data);
            }).error(function(data, status, headers, config) {
               defered.reject(data);
            });
          return promise;
        };
        
    return obj;
}]);