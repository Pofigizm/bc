'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('UserCtrl', function ($scope, $http, apiurl, $rootScope, $location, $timeout) {

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
        $scope.teltext = $scope.phoneToText( getdata.tel );
      });
    };

    $scope.doEdit = function( ){
      $scope.edit = true;
    };

    $scope.doSave = function( ){
      if( $scope.newdata.password === null ){
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

    $scope.phoneToText = function( telobj ) {

      telobj = telobj || {
        countryCode: '',
        areaCode: '',
        number: '',
        extension: ''
      };

      var text = '';
      text += '+ ' + telobj.countryCode;
      if( telobj.areaCode ) 
        text += ' ( ' + telobj.areaCode;
      if( telobj.number )
        text += ' ) ' + telobj.number.toString().split('').slice( 0, 3 ).join('');
      if( telobj.number.toString().length > 3 )
        text += '-' + telobj.number.toString().split('').slice( 3 ).join('');
      if( telobj.extension ) 
        text += ' ext: ' + telobj.extension;

      return text;
    };

    $scope.textToPhone = function( teltext ) {

      var telobj = {};
      telobj.countryCode = '';
      telobj.areaCode = '';
      telobj.number = '';
      telobj.extension = '';

      var a = ('' + teltext).replace(/[^0-9]/g,'').split('');
      telobj.countryCode  = '1';
      telobj.areaCode     = a.slice(  1,  4 ).join('');
      telobj.number       = a.slice(  4, 11 ).join('');
      telobj.extension    = a.slice( 11, 15 ).join('');

      return telobj;      
    };

    $scope.checkphone = function( ){

      $scope.newdata.tel = $scope.textToPhone( $scope.teltext );

      $timeout( function( ){
        $scope.teltext = $scope.phoneToText( $scope.newdata.tel );
      }, 0);
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
