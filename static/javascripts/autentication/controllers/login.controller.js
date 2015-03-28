/**
* LoginController
* @namespace managers.autentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('managers.autentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace LoginController
  */
  function LoginController($location, $scope, Authentication) {
    var vm = this;

    vm.login = login;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf managers.autentication.controllers.LoginController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf managers.autentication.controllers.LoginController
    */
    function login() {
      Authentication.login(vm.username, vm.password);
    }
  }
})();

function activate() {
  // If the user is authenticated, they should not be here.
  if (Authentication.isAuthenticated()) {
    $location.url('/');
  }
}

/**
* @name register
* @desc Try to register a new user
* @param {string} email The email entered by the user
* @param {string} password The password entered by the user
* @param {string} username The username entered by the user
* @returns {Promise}
* @memberOf managers.autentication.services.Authentication
*/
function register(username, password) {
  return $http.post('api/auth/login/', {
    username: username,
    password: password
  }).then(registerSuccessFn, registerErrorFn);

  /**
  * @name registerSuccessFn
  * @desc Log the new user in
  */
  function registerSuccessFn(data, status, headers, config) {
    Authentication.login(username, password);
  }

  /**
  * @name registerErrorFn
  * @desc Log "Epic failure!" to the console
  */
  function registerErrorFn(data, status, headers, config) {
    console.error('Epic failure!');
  }
}



