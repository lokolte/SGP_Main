/**
 * Created by Jesus Aguilar on 27/03/2015.
 */
/**
* Authentication
* @namespace managers.autentication.services
*/
(function () {
  'use strict';

  angular
    .module('managers.autentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      register: register
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf managers.autentication.services.Authentication
    */
    function register(username, password, email, nombre, apellido) {
      return $http.post('/api/usuarios/', {
        username: username,
        password: password,
        email: email,
        nombre: nombre,
        apellido: apellido
      });
    }
  }
})();

/**
 * @name login
 * @desc Try to log in with email `email` and password `password`
 * @param {string} email The email entered by the user
 * @param {string} password The password entered by the user
 * @returns {Promise}
 * @memberOf managers.autentication.services.Authentication
 */
function login(username, password) {
  return $http.post('api/auth/login/', {
    username: username, password: password
  });
}

var Authentication = {
  login: login,
  register: register
};

/**
 * @name getAuthenticatedAccount
 * @desc Return the currently authenticated account
 * @returns {object|undefined} Account if authenticated, else `undefined`
 * @memberOf managers.autentication.services.Authentication
 */
function getAuthenticatedUsuario() {
  if (!$cookies.authenticatedUsuario) {
    return;
  }

  return JSON.parse($cookies.authenticatedUsuario);
}

/**
 * @name isAuthenticated
 * @desc Check if the current user is authenticated
 * @returns {boolean} True is user is authenticated, else false.
 * @memberOf managers.autentication.services.Authentication
 */
function isAuthenticated() {
  return !!$cookies.authenticatedUsuario;
}

/**
 * @name setAuthenticatedAccount
 * @desc Stringify the account object and store it in a cookie
 * @param {Object} user The account object to be stored
 * @returns {undefined}
 * @memberOf managers.autentication.services.Authentication
 */
function setAuthenticatedUsuario(usuario) {
  $cookies.authenticatedUsuario = JSON.stringify(usuario);
}

/**
 * @name unauthenticate
 * @desc Delete the cookie where the user object is stored
 * @returns {undefined}
 * @memberOf managers.autentication.services.Authentication
 */
function unauthenticate() {
  delete $cookies.authenticatedUsuario;
}

var Authentication = {
  getAuthenticatedUsuario: getAuthenticatedUsuario,
  isAuthenticated: isAuthenticated,
  login: login,
  register: register,
  setAuthenticatedUsuario: setAuthenticatedUsuario,
  unauthenticate: unauthenticate
};

/**
 * @name login
 * @desc Try to log in with email `email` and password `password`
 * @param {string} email The email entered by the user
 * @param {string} password The password entered by the user
 * @returns {Promise}
 * @memberOf managers.autentication.services.Authentication
 */
function login(username, password) {
  return $http.post('api/auth/login/', {
    username: username, password: password
  }).then(loginSuccessFn, loginErrorFn);

  /**
   * @name loginSuccessFn
   * @desc Set the authenticated account and redirect to index
   */
  function loginSuccessFn(data, status, headers, config) {
    Authentication.setAuthenticatedUsuario(data.data);

    window.location = '/';
  }

  /**
   * @name loginErrorFn
   * @desc Log "Epic failure!" to the console
   */
  function loginErrorFn(data, status, headers, config) {
    console.error('Epic failure!');
  }
}

