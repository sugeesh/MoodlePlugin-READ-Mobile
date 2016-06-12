angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.rEADMoodleAssistance', {
    cache: false,
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/rEADMoodleAssistance.html',
        controller: 'rEADMoodleAssistanceCtrl'
      }
    }
  })

  .state('menu.courseContent', {
    url: '/page2/:date/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/courseContent.html',
        controller: 'courseContentCtrl'
      }
    }
  })

  .state('menu.chapter1', {
    url: '/page3:courseId/:section',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chapter1.html',
        controller: 'chapter1Ctrl'
      }
    }
  })

  .state('menu.sync', {
    url: '/pageSync',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sync.html',
        controller: 'syncCtrl'
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
