angular.module("appRoutes", ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/pages/home.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/views/pages/about.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
      });

  });
