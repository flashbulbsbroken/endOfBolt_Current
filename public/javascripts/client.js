var app = angular.module('eobApp', ['ngRoute', 'ngFileUpload']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/login.html',
            controller: 'LoginController'
        })
        .when('/home',{
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/register',{
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/add',{
            templateUrl: 'views/addSwatch.html',
            controller: 'AddSwatchController'
        })
        .when('/detail',{
            templateUrl: 'views/swatchDetail.html',
            controller: 'SwatchDetailController'
        })
        .when('/profile',{
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        });

    $locationProvider.html5Mode(true);

});