'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('UserCtrl', function ($scope, $http, apiurl, $rootScope, $location) {

    if( !$rootScope.currentUser ) $location.path('/');
    
    $scope.doLoad = function( ){
      httpLoadData( $rootScope.currentUser, function( getdata ) {

        if( !getdata ) $location.path('/');

        $scope.userdata = getdata;
        $scope.contentExist = true;
        $scope.newdata = {
          firstName: getdata.firstName,
          lastName: getdata.lastName,
          tel: { 
            countryCode: getdata.tel.countryCode,
            areaCode: getdata.tel.areaCode,
            number: getdata.tel.number,
            extension: getdata.tel.extension
          },
          password: null
        };
      });
    };

    $scope.doEdit = function( ){
      $scope.edit = true;
    };

    $scope.doSave = function( ){
      if( $scope.newdata.password == null ){
        $scope.error = true;
      } else {
        $scope.edit = false;
        
        httpSaveData( $rootScope.currentUser, $scope.newdata, function( getdata ) {
 
          // TODO - need refactoring 
          if( !getdata ) {
            // TODO - ERROR SAVE
          } else {
            $scope.doLoad();
          }
        });
      }
    };

    $scope.doCancel = function( ){
      $scope.edit = false;
      $scope.error = false;
      $scope.doLoad();
    };

    $scope.phoneToText = function( tel ) {
      tel = tel || {};
      // TODO - Have to understand why if remove check for tel-object throw errors
      // Error: [$interpolate:interr] Can't interpolate: {{phoneToText(userdata.tel);}}
      // TypeError: Cannot read property 'countryCode' of undefined
      var text = '';
      text += ' + ' + tel.countryCode;
      text += ' ( ' + tel.areaCode;
      text += ' ) ' + tel.number;
      if( tel.extension ) 
        text += ' ext: ' + tel.extension;
      return text;
    };

    // start data and calls

    $scope.userdata = {};
    $scope.edit = false;
    $scope.showJsonData = false;
    $scope.contentExist = false;
    $scope.error = false;

    $scope.doLoad(); 

    // lowlevel functions! Can be extract to service if upgrade

    function httpLoadData( user, cb ){
      $http({
        method: 'GET',
        withCredentials: true,
        url: apiurl + 'org/' + user.id + '/user/' + user.name + '.json',
        headers:{
          'Content-Type':'application/json; charset=utf-8'
        }
      })
      .success( function( ){
        return cb.apply( null, arguments );
      })
      .error( function( ){
        return cb.apply( null );
      });
    }

    function httpSaveData( user, data, cb ){
      $http({
        method: 'POST',
        withCredentials: true,
        url: apiurl + 'user/' + user.id,
        headers:{
          'Content-Type':'application/json; charset=utf-8'
        },
        data: JSON.stringify( data )
      })
      .success( function( ){
        return cb.apply( null, arguments );
      })
      .error( function( ){
        return cb.apply( null );
      });
    }

  });
