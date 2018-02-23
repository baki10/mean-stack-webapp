angular.module('mainController', ['authServices'])

  .controller('mainCtrl', function ($location, $timeout, Auth) {
    var main = this;

    main.doLogin = function (loginData) {
      main.loading = true;
      main.errorMessage = false;
      main.successMessage = false;
      Auth.login(loginData).then(function (data) {
        if (data.data.success) {
          // create success message
          main.successMessage = data.data.message + "... Redirecting";
          // redirect to home
          $timeout(function () {
            $location.path("about");
          }, 2000);
        } else {
          // create error message
          main.errorMessage = data.data.message;
        }
        main.loading = false;
      });
    };
  });