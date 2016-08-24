(function(){



angular.module('exampleApp', ['ngDialog'])
.controller('oflClassCtrl', oflClassCtrl)

function oflClassCtrl($scope,ngDialog) {
    // $http.get('../courses/coursedata.json');
    $scope.clickToOpen = function(index){
    $scope.selectedClass= $scope.classes[index];
    ngDialog.open({template: 'ext.html'});
    };
  $scope.classes = [
{"class": "ENGLISH I: INTRO TO LITERATURE AND COMPOSITION Sem 2", "href": "../courses/english.php#p1"}

  ];
} //cntrler
})();