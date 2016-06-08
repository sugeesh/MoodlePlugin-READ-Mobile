angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.rEADMoodleAssistance', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/rEADMoodleAssistance.html',
        controller: 'rEADMoodleAssistanceCtrl'
      }
    }
  })

  .state('menu.recomenedChapters', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recomenedChapters.html',
        controller: 'recomenedChaptersCtrl'
      }
    }
  })

  .state('menu.chapter1', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chapter1.html',
        controller: 'chapter1Ctrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/page4')



});
