/**
 * Created by Jesus Aguilar on 27/03/2015.
 */
/**
* Authentication
* @namespace managers.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('managers.authentication.services')
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
    * @memberOf managers.authentication.services.Authentication
    */
    function register(username, password, email, nombre, apellido) {
      return $http.post('/api/usuarios/', {
        username: username,
        password: password,
        email: email,
        nombre: nombre,
        apellido: apllido
      });
    }
  }
})();