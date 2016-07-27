var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope','$http', 
function($scope, $http){
  console.log("Hello World from controller!");

  

    var refresh = function() {
        $http.get('/contactbookdb').success(function(response){
          console.log("I got the data I requested in json");
        $scope.contactbookdb = response;
        $scope.contact = "";
      });
    }

    refresh();

    $scope.addContact = function(){
      console.log($scope.contact);
      $http.post('/contactbookdb', $scope.contact).success(function(response){
        console.log(response);
        refresh();
      })
    };

    $scope.remove = function(id){
      console.log(id);
      $http.delete('/contactbookdb/' + id).success(function(response){
          refresh();
      });
    };

    $scope.edit = function(id){
      console.log(id);
      $http.get('/contactbookdb/' + id).success(function(response){
        $scope.contact = response;
      });
    };

    $scope.update = function() {
      console.log($scope.contact._id);
      $http.put('/contactbookdb/' + $scope.contact._id, $scope.contact).success(function(response){
        refresh();
      })
    };

    $scope.deselect = function() {
      $scope.contact = "";
    }


}]);