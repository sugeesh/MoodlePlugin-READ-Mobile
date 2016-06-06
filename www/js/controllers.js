angular.module('app.controllers', [])

.controller('rEADMoodleAssistanceCtrl', function($scope,$ionicPlatform, $cordovaLocalNotification) {

  $ionicPlatform.ready(function(){
    $cordovaLocalNotification.add({message: 'Hello Local'});
  })

})

.controller('recomenedChaptersCtrl', function($scope) {

})

.controller('chapter1Ctrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})
