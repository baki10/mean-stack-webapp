angular.module('userServices', [])

  .factory('User', function ($http) {
    var userFactory = {};

    userFactory.create = function (user) {
      return $http.post('/api/users', user);
    };

    return userFactory;
  });