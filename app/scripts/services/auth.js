'use strict';

/**
 * @ngdoc service
 * @name bcApp.auth
 * @description
 * # auth
 * Constant in the bcApp.
 */
angular.module('bcApp')
  .factory('auth', function ( $http, $rootScope, $location, apiurl ){
    return {

      isLogin: function (){
  
        $http({
          method: 'GET',
          withCredentials: true,
          url: apiurl + 'user.json',
          headers:{
            'Content-Type':'application/json'
          }
        })
        .success( function( getdata ){
          if( getdata.id ) {
            $rootScope.currentUser = {
              auth: true,
              id: getdata.id,
              name: getdata.username
            };
          } else {
            $location.path('/');
          }
        });
      }
    };  
  });
