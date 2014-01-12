var controlCenterApp = angular.module('controlCenterApp', ['restangular']);

controlCenterApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:8080/api');
  RestangularProvider.setRequestSuffix('.json');
});

controlCenterApp.controller('ControlCenterCtrl', function ($scope, Restangular) {
  // Set up an empty merchant object as starting state, and we reset to it on error.
  var emptyMerchant = {
    name: '',
    address: ''
  };

  $scope.searching = false; // By default hide the indicator
  $scope.searchResult = emptyMerchant;
  $scope.searchMessage = "Results will appear here when you search.";

  $scope.$watch('searchVal.id', function(id){
      $scope.searchVal.id = (id);
    });

  $scope.searchVal = function() {
    $scope.searching = true;
    Restangular.one('merchants', $scope.searchVal.id).get().then(function(merchant) {
      $scope.searchMessage = "Found:";
      $scope.searchResult = merchant;
      $scope.searching = false;
    }, function(response) {
      $scope.searchMessage = "Id not found.";
      $scope.searchResult = emptyMerchant;
      $scope.searching = false;
    });
   };
});