angular.module('ClientMaster.personalInfo', ['ngCookies']).controller('PersonalInfoCtrl', ['$scope', '$http', '$state', '$location', '$cookieStore', function ($scope, $http, $state, $location, $cookieStore) {
    console.log('client Personal Info Controller is working!!!!!!!');

    var uri = 'http://localhost:1337/api/client/detail?id=';
    var url = uri + $cookieStore.get('clientDetailId');
    var uploadUrl = 'http://localhost:1337/api/client/detail';

    function getData() {
        console.log(url);
        $http.get(url).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
                $scope.personalInfo = response;
            });
    }
    if ($cookieStore.get('clientDetailId')) {
        getData();
    }

    $scope.personalInfo = {};

    

    uploadPersonalInfo = function () {
        console.log($scope.personalInfo);
        $http({
                method: 'PUT',
                url: uploadUrl,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: $scope.personalInfo
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
            });
    };

    postPersonalInfo = function () {
        console.log($scope.personalInfo);
        $http({
                method: 'POST',
                url: uploadUrl,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: $scope.personalInfo
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
            });
    };
    
    
    $scope.uploadData = function () {
        if ($cookieStore.get('clientDetailId')) {
            uploadPersonalInfo();
        }else{
            postPersonalInfo();
        }
    };
    
    
}]);
