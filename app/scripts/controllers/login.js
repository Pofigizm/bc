'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('LoginCtrl', function ($scope, $http, apiurl, $location, $rootScope) {

    $scope.user = { email: 'test@odesk2.com', password: 'password' };  // test
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      var postdata = JSON.stringify({
        username : $scope.user.email,
        password : $scope.user.password
      });

/*
          'Accept':'application/json',
          'Access-Control-Allow-Origin': '*'
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
*/

      $http({
        method: 'POST',
        withCredentials: true,
        url: apiurl + 'auth',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
        },
        data: postdata
      })
      .success( function( getdata ) {

        $rootScope.currentUser = {
          auth: true,
          id: getdata.id,
          email: getdata.username
        }
        $location.path('/');
      
      })
      .error( function( getdata) {

        $rootScope.currentUser = { auth: false };
        //TODO - message login error

      });
    };

  });
