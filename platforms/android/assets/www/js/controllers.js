angular.module('app.controllers', [])

.controller('rEADMoodleAssistanceCtrl', function($scope, $ionicPlatform, $cordovaLocalNotification, $cordovaSQLite) {

  // $ionicPlatform.ready(function(){
  //   $cordovaLocalNotification.add({message: 'Hello Local'});
  // })

  // $cordovaLocalNotification.schedule({
  //   id: 1,
  //   title: 'My Title',
  //   text: 'My text',
  //   icon: 'http://icons.iconarchive.com/icons/martz90/circle/32/books-icon.png',
  //   color: '0000FF',
  //   data: {
  //     customProperty: 'custom value'
  //   }
  // }).then(function(result) {
  //   console.log('Notification 1 triggered');
  // });

  // $cordovaLocalNotification.schedule({
  //   id: 1,
  //   title: 'Warning',
  //   text: "My Text!",
  //   data: {
  //     customProperty: 'custom value'
  //   }
  // }).then(function(result) {
  //   console.log('Notification 1 triggered');
  // });

  $scope.people = [];
  var query = "SELECT id,fullname,shortname,date FROM course";
  $cordovaSQLite.execute(db, query, []).then(function(res) {
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        $scope.people.push({fullname :res.rows.item(i).fullname, shortname :res.rows.item(i).shortname, id :res.rows.item(i).id, date :res.rows.item(i).date});
      }
    } else {
      console.log("No results found");
    }
  }, function(err) {
    console.error(err);
  });


})

.controller('courseContentCtrl', function($scope,$stateParams) {
  $scope.myName = $stateParams.date;

})

.controller('chapter1Ctrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

});


example.controller("ExampleController", function($scope, $cordovaSQLite, $ionicPlatform) {
  $scope.insert = function(id,category,firstname, lastname) {
    var query = "INSERT INTO course VALUES (?,?,?,?)";
    $cordovaSQLite.execute(db, query, [id,category,firstname, lastname]).then(function(res) {
      $scope.myName = "Id is " + res.insertId;
    }, function(err) {
      $scope.myName = err;
    });

  }

  $scope.select = function(lastname) {
    $scope.people = [];
    var query = "SELECT fullname FROM course";
    $cordovaSQLite.execute(db, query, []).then(function(res) {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          $scope.people.push({firstname :res.rows.item(i).fullname});
        }
      } else {
        console.log("No results found");
      }
    }, function(err) {
      console.error(err);
    });
  }

});
