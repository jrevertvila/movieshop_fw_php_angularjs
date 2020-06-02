movieshop.controller('contactCtrl', ["$scope","services","$css",function($scope,services,$css){

	$scope.contact = {
        name: "Joel Revert Vila",
        email: "joel.iestacio@gmail.com",
        tlf: "665974625",
        location: "Spain",
        issue: "Texto de prueba contact"
    };
    
    $scope.SubmitContact = function () {
        var data = {
            "name": $scope.contact.name, 
            "email": $scope.contact.email, 
            "tlf": $scope.contact.tlf, 
            "location": $scope.contact.location,
            "issue": $scope.contact.issue,
            "token":'contact_form'
        };
        
        services.post('contact', 'send_contact', data).then(function (response) {
            check = JSON.parse(response);
            if(check == true){
                console.log("ENVIADO");
                toastr.success('Email sent successfully!');
            }else{
                console.log("ERROR");
                toastr.error('Something went wrong :/ Wait or try again.');
            }
        });
        console.log("click");
    };

    $css.remove(['/movieshop_fw_php_angularjs/client/frontend/modules/home/view/css/header.css']);
    $css.add('/movieshop_fw_php_angularjs/client/frontend/assets/css/header.css');
    
}]);
