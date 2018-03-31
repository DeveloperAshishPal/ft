angular.module('ClientMaster.photo', ['ng-file-input', 'ngFileUpload']).controller('PhotoCtrl', ['$scope', '$http', '$cookieStore', '$location', 'fileUpload', 'Upload','$timeout', function ($scope, $http, $cookieStore, $location, fileUpload, Upload,$timeout) {
    console.log('client Photo Controller is working!!!!!!!');
    
    
    var result = [];
    $scope.updatePhoto = function(){
        console.log(result);
        
        $http({
                method: 'PUT',
                url: 'http://localhost:1337/api/client/detail/photos',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: {
                    id : $cookieStore.get('clientDetailId'),
                    photos : result
                }
            }).error(function (err) {
                console.log(err);
            })
            .success(function (response) {
                console.log(response);
            
            });
    }
    
    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: 'http://localhost:1339/file/upload',
                data: {uploadFile: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    console.log(response.data);
                    result.push(response.data.file[0].fd);
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });  
    };
                             

}]);