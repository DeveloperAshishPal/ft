angular.module('ClientMaster.offer', ['ngCookies']).controller('OfferCtrl', ['$scope', '$http', '$state', '$location', '$cookieStore', function ($scope, $http, $state, $location, $cookieStore) {
    console.log('client offer  Controller is working!!!!!!!');

    var uri = 'http://localhost:1337/api/client/detail/uniOffer?clientDetailId=';
    var url = uri + $cookieStore.get('clientDetailId');
    $scope.offers = [];

    function getData() {
        console.log(url);
        $http.get(url)
            .then(function (response) {
                console.log(response.data);
                $scope.offers = response.data;
            });
    }
    if ($cookieStore.get('clientDetailId')) {
        getData();
    }

    $scope.isEmpty = function () {
        var result = false;
        if ($scope.offers.length === 0) {
            result = true;
        }
        return result;
    };

    var dataURL = 'http://localhost:1337/api/client/detail/offer';

    $scope.clientOffer = {
        clientDetailId: $cookieStore.get('clientDetailId')
    };

    $scope.addOffer = function () {
        $http({
                method: 'POST',
                url: dataURL,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: $scope.clientOffer
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
                $scope.offers.push(response);
                clearInput();
            });
    };

    function clearInput() {
        $scope.clientOffer = {
            clientDetailId: $cookieStore.get('clientDetailId')
        };
    }
    $scope.deleteOffer = function (offer) {
        $http({
                method: 'DELETE',
                url: dataURL,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: {
                    id: offer.id
                }
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
                var index = $scope.offers.indexOf(offer);
                $scope.offers.splice(index, 1);
            });
    };

}]);
