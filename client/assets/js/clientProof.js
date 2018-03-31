angular.module('ClientMaster.proof', ['ngFileUpload']).controller('ProofCtrl', ['$scope', '$http', '$state', '$location', 'Upload', '$cookieStore', function ($scope, $http, $state, $location, Upload, $cookieStore) {
    console.log('client Proof Controller is working!!!!!!!');

    $scope.proofModel = {
        telephoneBill: '',
        businessCard: '',
        electricityBill: ''
    };
    $scope.up = {
        tbill: false,
        bcard: false,
        ebill: false
    }
    var saveObj = '';
    $scope.setValue = function (data) {
        console.log(data);
        saveObj = data;
    }

    $scope.upload = function (file) {

        Upload.upload({
            url: 'http://localhost:1339/file/upload',
            data: {
                uploadFile: file
            }
        }).then(function (resp) {
            if (saveObj === 'telephoneBill') {
                $scope.proofModel.telephoneBill = resp.data.file[0].fd;
                $scope.up.tbill = true;
            } else if (saveObj === 'businessCard') {
                $scope.proofModel.businessCard = resp.data.file[0].fd;
                $scope.up.bcard = true;
            } else if (saveObj === 'electricityBill') {
                $scope.proofModel.electricityBill = resp.data.file[0].fd;
                $scope.up.ebill = true;
            }

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };

    function checkIfPresent() {
        console.log('into getID');
        var url = 'http://localhost:1337/api/client/getId?id=' + $cookieStore.get('clientId');
        $http.get(url)
            .then(function (response) {
                //console.log(response.data.proofId);
                
                if (response.data.proofId === '') {
                    return false;
                } else {
                    $cookieStore.put('proofId',response.data.proofId);
                    return true;
                }
            });
    }
    function getData(){
        console.log('into getData');
        checkIfPresent();
        if($cookieStore.get('proofId')){
            url = 'http://localhost:1337/api/client/detail/proof?id=' + $cookieStore.get('proofId');
            $http.get(url)
            .then(function (response) {
                console.log(response);
                $scope.proofModel = response.data;
            });
        }
        
    }
    getData();
    var uploadUrl = 'http://localhost:1337/api/client/detail/proof';
    $scope.updateProof = function () {
        
        if ($cookieStore.get('proofId')) {
                $scope.proofModel.clientDetailId = $cookieStore.get('clientDetailId');
                /*here will write update program*/
            console.log($scope.proofModel);
                $http({
                        method: 'PUT',
                        url: uploadUrl,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        data: $scope.proofModel
                    }).error(function (err) {
                        console.log(err);
                    })
                    .success(function (response) {
                        console.log(response);
                        $scope.proofModel = {};
                    });
            
        } else {
            
                /*here will write post program*/
                console.log($scope.personalInfo);
                $http({
                        method: 'POST',
                        url: uploadUrl,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        data: $scope.proofModel
                    }).error(function (err) {
                        console.log(err);
                    })
                    .success(function (response) {
                        console.log(response);
                        $scope.proofModel = {};
                    });
            
        }
        console.log($scope.proofModel);
    }
}]);
