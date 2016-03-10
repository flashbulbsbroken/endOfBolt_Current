app.controller('HomeController', ['$scope', '$http', function($scope, $http){

    $scope.getSwatches = function(){
        $http({method: "GET", url:"/home/get"}).then(function(response){

            $scope.swatchList = [];

            for (var i = 0; i < response.data.length; i++){
                console.log(response.data[i]);
                $scope.swatchList.push(response.data[i]);
            }

        });
    };


    ////data has nothing
    //$scope.getSwatchDetails = function(){
    //    $http({method: "GET", url:"/home/details"}).then(function(response){
    //
    //        console.log('response details', response.data);
    //
    //        $scope.details = response.data;
    //
    //    });
    //};


    $scope.getSwatches();

}]);