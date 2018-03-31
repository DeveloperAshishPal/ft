angular.module('ClientMaster.register', ['ngCookies']).controller('ClientRegisterCtrl', ['$scope', '$http','$state','$location','$cookieStore', function ($scope, $http,$state,$location,$cookieStore) {
    console.log('client register Controller is working!!!!!!!');
    
    function checkIsLoggedIn(){
        if($cookieStore.get('clientId')){
            $location.path('app/dashboard');
        }
    }
    
    checkIsLoggedIn();
    
    $scope.clientDetail = {
        'phone': '',
        'password': '',
        'name': '',
        'email': ''
    };

    var uri = 'http://localhost:1337/api/client/signup';
    $scope.clientRegister = function () {
        console.log('into Register');
        console.log($scope.clientDetail);
        $http({
                method: 'POST',
                url: uri,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: $scope.clientDetail
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
            console.log(response);
            $cookieStore.put('clientId',response.id);
            $location.path('app/dashboard');
            });
    };
}]);