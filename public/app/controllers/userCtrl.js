angular.module('userControllers', [])
  .controller('regCtrl', function ($http, $location) {

    var register = this;

    register.regUser = function (user) {
      register.loading = true;
      register.errorMessage = false;
      register.successMessage = false;
      $http.post('/api/users', user)
        .then(function (data) {
          if (data.data.success) {
            register.successMessage = data.data.message;
            $location.path("home");
          } else {
            register.errorMessage = data.data.message;
          }
          register.loading = false;
        });
    }
  });