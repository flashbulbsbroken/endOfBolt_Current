app.controller('AddSwatchController', ['$scope', '$http', '$location', 'Upload', function($scope, $http, $location, Upload){

    $scope.swatchForm = {};

    $scope.addSwatch = function(event){


        $scope.upload($scope.file);

        $location.path('/home');

    };

    $scope.upload = function (file) {
        var data = {file: file, swatchData: $scope.swatchForm};

        Upload.upload({
            url: '/add/add',
            data: data
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    };


}]);