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

        //ANY ARGUMENT
         obj.get = function (module, functi, dada = "not defined") {
            var defered=$q.defer();
            var promise=defered.promise;
            if(dada == "not defined"){
               // console.log("no params");
               urll = serviceBase + module + '&function=' + functi;
            }else{
               // console.log("params");
               urll= serviceBase + module + '&function=' + functi + '&param=' + dada
            }
            $http({
                  method: 'GET',
                  url: urll
            }).success(function(data, status, headers, config) {
               defered.resolve(data);
            }).error(function(data, status, headers, config) {
               defered.reject(data);
            });
            return promise;
         };
        
    return obj;
    
}]).factory('DataTransfer', function () {

   var data = {};

   return {
       getAllMovies: function () {
           return data;
       },
       setAllMovies: function (UserDetails) {
           data = UserDetails;
       }
   };

}).factory('showDetails', function ($window) {
      return {
         film: function (id) {
            console.log("entra");
            $window.location.href = "#shop/"+id
         }
      };

});