'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bcApp
 */

var unique = function( array, key ){
   var result = [];
   array.forEach( function( el ){
      var value = el[key];
      if (result.indexOf(value) == -1) {
         result.push(value);
      }    
   });
   return result;
};

angular.module('bcApp')
  .controller( 'BuyersCtrl', function( $scope, $http, $filter, $q ){

    $scope.btstyle = {};
    $scope.search = {};
    $scope.show = {};
    $scope.nameList = [];

    $http.get('scripts/controllers/data.json')
      .then(function(res){
        $scope.contactList = $filter('orderBy')(res.data, 'name');
        $scope.contactList
          .forEach( function( buyer ){
            buyer.ngr = buyer.name.slice( 0, 1 );
          });
        $scope.searchUpdate();        
      });

    $scope.searchUpdate = function( ){
      $scope.nameList = $filter('filter')( $scope.contactList, $scope.search );
      $scope.letters = unique( $scope.nameList, 'ngr' );
    };

    $scope.showUpdate = function( value ){
      $scope.show._id = value;
      if( value === '_' ) {
        $scope.btstyle.big = ' ';
        $scope.btstyle.small = 'col-sm-4';
      } else {
        $scope.btstyle.big = 'hidden-xs col-sm-4 leftcol';
        $scope.btstyle.small = ' ';
      }
    };
    $scope.showUpdate( '_' );     

  })
  .directive('buyerContact', function( ){
      return {
        restrict: 'E',
        templateUrl: './views/drct/buyerContact.html'
      };
  });