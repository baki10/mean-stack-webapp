angular.module('userControllers', [])
  .controller('regCtrl', function ($http, $location, $timeout) {

    var register = this;

    register.regUser = function (user) {
      register.loading = true;
      register.errorMessage = false;
      register.successMessage = false;
      $http.post('/api/users', user)
        .then(function (data) {
          if (data.data.success) {
            // create success message
            register.successMessage = data.data.message;
            // redirect to home
            $timeout(function () {
              $location.path("home");
            }, 2000);
          } else {
            // create error message
            register.errorMessage = data.data.message;
          }
          register.loading = false;
        });
    }
  });