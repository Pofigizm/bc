'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('LoginCtrl', function ( $scope, $http, apiurl, $location, $rootScope ) {

    $scope.user = { name: 'test@odesk2.com', password: 'password'}; 
    $scope.error = false;

    $scope.hideErr = function( ){
      $scope.error = false;
    };

    $scope.doLogin = function( ){
      $scope.submitted = true;

      var postdata = JSON.stringify({
        username : $scope.user.name,
        password : $scope.user.password
      });
      
      $http({
        method: 'POST',
        withCredentials: true,
        url: apiurl + 'auth',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
        },
        data: postdata
      })
      .success( function( getdata ){
        $rootScope.currentUser = {
          auth: true,
          id: getdata.id,
          name: getdata.username
        };
        $location.path('/user');
      })
      .error( function( ){
        $rootScope.currentUser = null;
        $scope.error = true;
      });
    };

  });
