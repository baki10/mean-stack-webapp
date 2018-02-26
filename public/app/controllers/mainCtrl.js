angular.module('mainController', ['authServices'])

  .controller('mainCtrl', function ($location, $timeout, Auth, $rootScope, $transitions) {
    var main = this;
    main.loginData = {};


    main.loadme = false;
    $transitions.onSuccess({to: '*'}, function () {
      if (Auth.isLoggedIn()) {
        main.isLoggedIn = true;
        Auth.getUser().then(function (data) {
          main.username = data.data.username;
          main.useremail = data.data.email;
          main.loadme = true;
        });
      } else {
        main.isLoggedIn = false;
        main.username = false;
        main.loadme = true;
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