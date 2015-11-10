

var app = angular.module('myApp', ['ui.router'])

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('landing', {
        url: '/landing',
        controller: 'LandingController',
        templateUrl: 'app/_landing.html'
    }).state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: 'app/_profile.html'
    });

    $urlRouterProvider.otherwise('/landing');
});

app.controller('LandingController', function ($scope, $http, $rootScope) {
    $http.get('/validate').then(function (config) {
        console.log(config.data);
        $rootScope.user = config.data;
    }, function (config) {
        if(config.status === 401) {
            // redirect the user to /auth/google
            window.location = location.origin + '/auth/google';
        }
    });
});

app.controller('ProfileController', ['$scope', '$http', function ($scope, $http) {

    $scope.createUser = function () {
        $scope.new_user = {};
        $scope.new_user.google_id = $scope.user.id;
        $scope.new_user.google_user = angular.copy($scope.user);
        // saves the user to the database
        $http.post('/candidates', $scope.new_user).then(function () {

        }, function (config) {
            console.log(config)
        });
    };

}]); //explicit DI

