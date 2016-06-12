angular.module('app.services', [])

.factory('SyncSevice', ['$http','$q',function($http,$q) {

    return {
        syncwithServer: function() {
            var deferred = $q.defer();

            $http.get("http://drosx.com/a.php/mdl_course/0?getCourses=1").then(function(res){
              var results = res.data.results.map(function(result){
                result.courseId = result.courseId;
                return result;

              });
              deferred.resolve(results);
            });
            // var courses = [{
            //     "userId": "3",
            //     "courseId": "2"
            // }, {
            //     "userId": "5",
            //     "courseId": "3"
            // }];
            // deferred.resolve(courses);
            return deferred.promise;

        }

    }


}])

.service('BlankService', [function() {

}]);
