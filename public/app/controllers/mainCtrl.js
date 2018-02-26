angular.module('mainController', ['authServices'])

  .controller('mainCtrl', function ($location, $timeout, Auth, $rootScope, $transitions) {
    var main = this;
    main.loginData = {};

    $transitions.onSuccess({to: '*'}, function () {
      if (Auth.isLoggedIn()) {
        console.log("Logged in");
        Auth.getUser().then(function (data) {
          main.username = data.data.username;
          main.useremail = data.data.email;
        });
      } else {
        console.log("Not logged in");
        main.username = false;
      }
    });

    main.doLogin = function () {
      main.loading = true;
      main.errorMessage = false;
      main.successMessage = false;
      Auth.login(main.loginData).then(function (data) {
        if (data.data.success) {
          // create success message
          main.successMessage = data.data.message + "... Redirecting";
          // redirect to about
          $timeout(function () {
            $location.path("about");
            main.loginData = {};
            main.successMessage = false;
          }, 2000);
        } else {
          // create error message
          main.errorMessage = data.data.message;
        }
        main.loading = false;
      });
    };

    main.logout = function () {
      Auth.logout();
      $location.path("logout");
      // redirect to home
      $timeout(function () {
        $location.path("home");
      }, 2000);
    }
  });