angular.module('ClientMaster.location', []).controller('LocationCtrl', ['$scope', '$http', '$state', '$location', '$cookieStore', function ($scope, $http, $state, $location, $cookieStore) {
    console.log('client location Controller is working!!!!!!!');
    var uploadUrl = 'http://localhost:1337/api/client/detail/location';

    function getData() {
        var uri = 'http://localhost:1337/api/client/detail/locationByOwner?clientDetailId=';
        var url = uri + $cookieStore.get('clientDetailId');
        console.log(url);
        $http.get(url).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
                $scope.location = response;
                $cookieStore.put('locationId', response.id);
            });
    }
    if ($cookieStore.get('clientDetailId')) {
        getData();
    }

    $scope.location = {
        clientDetailId: $cookieStore.get('clientDetailId')
    };



    uploadLocation = function () {
        console.log($scope.location);
        $http({
                method: 'PUT',
                url: uploadUrl,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: $scope.location
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
            });
    };

    postLocation = function () {
        console.log($scope.location);
        $http({
                method: 'POST',
                url: uploadUrl,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: $scope.location
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
                $cookieStore.put('locationId', response.id);
            });
    };


    $scope.uploadData = function () {
        if ($cookieStore.get('locationId')) {
            uploadLocation();
        } else {
            postLocation();
        }
    };
}]);
