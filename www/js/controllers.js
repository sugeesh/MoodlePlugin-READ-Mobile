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
                $scope.people.push({
                    fullname: res.rows.item(i).fullname,
                    shortname: res.rows.item(i).shortname,
                    id: res.rows.item(i).id,
                    date: res.rows.item(i).date
                });
            }
        } else {
            console.log("No results found");
        }
    }, function(err) {
        console.error(err);
    });


})

.controller('courseContentCtrl', function($scope, $stateParams) {
    $scope.myName = $stateParams.date;
    $scope.courseId = $stateParams.id;

})

.controller('syncCtrl', function($scope, $stateParams, $http, $cordovaSQLite, $ionicHistory, $state, $window) {



    // SyncSevice.syncwithServer().then(function(res){
    //   $scope.title = res;
    // });

})

.controller('chapter1Ctrl', function($scope, $stateParams, $cordovaSQLite) {
    $scope.data = [];
    var query = "SELECT rc.name as rcname,rb.id as rbid,rc.start_page,rc.section, rc.end_page,rb.name as rbname,rc.finished FROM recommendbook rb, recommendchapter rc WHERE rc.recommendbookid = rb.id AND rb.courseid=" + $stateParams.courseId + "  AND rc.section=" + $stateParams.section;
    $cordovaSQLite.execute(db, query, []).then(function(res) {
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                $scope.data.push({
                    id: res.rows.item(i).id,
                    rcname: res.rows.item(i).rcname,
                    rbid: res.rows.item(i).rbid,
                    section: res.rows.item(i).section,
                    rbname: res.rows.item(i).rbname,
                    start_page: res.rows.item(i).start_page,
                    end_page: res.rows.item(i).end_page,
                    finished: res.rows.item(i).finished
                });
            }
        } else {
            $scope.text = "No resource added for this week";
            console.log("No results found");
        }
    }, function(err) {
        console.error(err);
    });


})

.controller('loginCtrl', function($scope) {

})

.controller('missedChaptersCtrl', function($scope, $stateParams, $cordovaSQLite) {
    $scope.data = [];
    var query = "SELECT rc.name as rcname,c.fullname as coursename, rb.id as rbid,rc.start_page,rc.section, rc.end_page,rb.name as rbname,rc.finished FROM recommendbook rb, recommendchapter rc , course c WHERE rc.recommendbookid = rb.id AND c.id=rb.courseid AND rc.finished=0 ";
    " rb.courseid=" + $stateParams.courseId + "  AND rc.section=" + $stateParams.section;
    $cordovaSQLite.execute(db, query, []).then(function(res) {
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                $scope.data.push({
                    id: res.rows.item(i).id,
                    coursename: res.rows.item(i).coursename,
                    rcname: res.rows.item(i).rcname,
                    rbid: res.rows.item(i).rbid,
                    section: res.rows.item(i).section,
                    rbname: res.rows.item(i).rbname,
                    start_page: res.rows.item(i).start_page,
                    end_page: res.rows.item(i).end_page,
                    finished: res.rows.item(i).finished
                });
            }
        } else {
            $scope.text = "No resource added for this week";
            console.log("No results found");
        }
    }, function(err) {
        console.error(err);
    });


})


example.controller("finishedController", function($scope, $cordovaSQLite, $ionicPlatform) {

    $scope.saveSettings = function(finished, section, rbid) {
        $scope.finished = !$scope.finished;
        var a;
        if (finished == false) {
            a = 0;
        } else {
            a = 1;
        }
        var query = "UPDATE recommendchapter SET finished = ? WHERE section = ? AND recommendbookid=?";
        $scope.myName = "Added" + a;
        $cordovaSQLite.execute(db, query, [a, section, rbid]).then(function(res) {}, function(err) {
            $scope.myName = err;
        });
    }
})


example.controller("syncController", function($scope, $stateParams, $http, $cordovaSQLite, $window) {
    $scope.server = "http://drosx.com";
    $scope.name = "student1";

    $scope.sync1 = function(server, name) {

        $http.get(server + "/a.php/mdl_course/0?getCourses=" + name).then(function(result) {
                var finisheddata = [];
                var query = "SELECT id FROM recommendchapter WHERE finished = 1";
                $cordovaSQLite.execute(db, query, []).then(function(res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            finisheddata.push(res.rows.item(i).id);
                        }

                    }
                }, function(err) {
                    console.error(err);
                });

                var query = "DELETE FROM course";
                $cordovaSQLite.execute(db, query);
                query = "DELETE FROM recommendbook";
                $cordovaSQLite.execute(db, query)
                query = "DELETE FROM recommendchapter";
                $cordovaSQLite.execute(db, query)
                var length = result.data.length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        var courseId = result.data[i].courseId;
                        var fullname = result.data[i].fullname;
                        var shortname = result.data[i].shortname;
                        var date = result.data[i].date;

                        $cordovaSQLite.execute(db, "INSERT INTO course VALUES(?,?,?,?)", [courseId, fullname, shortname, date]);
                        $http.get(server + "/a.php/mdl_course/0?getBooks=" + courseId).then(function(result2) {
                            var length2 = result2.data.length;
                            if (length2 > 0) {
                                for (var j = 0; j < length2; j++) {
                                    var rbid = result2.data[j].id;
                                    var name = result2.data[j].name;
                                    var sectionid = result2.data[j].section;

                                    // $scope.title = courseId+" "+length2;
                                    if(i==0){
                                      $scope.title = rbid+" "+name+" "+courseId+" "+sectionid;
                                    }
                                    $cordovaSQLite.execute(db, "INSERT INTO recommendbook VALUES(?,?,?,?)", [rbid, name, courseId, sectionid]);
                                    // $cordovaSQLite.execute(db, "INSERT INTO recommendbook VALUES(1,'Database Systems',5,1)");
                                }
                            }
                        })
                        $http.get(server + "/a.php/mdl_course/0?getChapters=" + courseId).then(function(result3) {
                            var length3 = result3.data.length;
                            if (length3 > 0) {
                                for (var j = 0; j < length3; j++) {
                                    var rcid = result3.data[j].id;
                                    var name = result3.data[j].name;
                                    var start_page = result3.data[j].start_page;
                                    var end_page = result3.data[j].end_page;
                                    var rbid = result3.data[j].recommend_book_id;
                                    var section = result3.data[j].section;
                                    var finished = 0;
                                    if (finisheddata.indexOf(Number(rcid)) != -1) {
                                        finished = 1;
                                    }
                                    $cordovaSQLite.execute(db, "INSERT INTO recommendchapter VALUES(?,?,?,?,?,?,?)", [rcid, name, start_page, end_page, section, rbid, finished]);
                                    // $scope.title = "Database Synced";
                                }
                            }
                        })
                    }
                    $scope.title = "Database Synced";
                } else {
                    $scope.title = "Error. Wrong url, username or password";
                }
            },
            function(err) {
                $scope.title = err;
            })
    }
});



// example.controller("ExampleController", function($scope, $cordovaSQLite, $ionicPlatform) {
//   $scope.insert = function(id,category,firstname, lastname) {
//     var query = "INSERT INTO course VALUES (?,?,?,?)";
//     $cordovaSQLite.execute(db, query, [id,category,firstname, lastname]).then(function(res) {
//       $scope.myName = "Id is " + res.insertId;
//     }, function(err) {
//       $scope.myName = err;
//     });
//
//   }
//
//   $scope.select = function(lastname) {
//     $scope.people = [];
//     var query = "SELECT fullname FROM course";
//     $cordovaSQLite.execute(db, query, []).then(function(res) {
//       if (res.rows.length > 0) {
//         for (var i = 0; i < res.rows.length; i++) {
//           $scope.people.push({firstname :res.rows.item(i).fullname});
//         }
//       } else {
//         console.log("No results found");
//       }
//     }, function(err) {
//       console.error(err);
//     });
//   }
//
// });
