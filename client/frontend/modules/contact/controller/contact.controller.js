movieshop.controller('contactCtrl', ["$scope","services",function($scope,services){
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

        var contact_form = JSON.stringify(data);
        
        console.log(data);
        
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
}]);
