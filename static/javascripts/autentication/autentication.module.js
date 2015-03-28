/**
 * Created by Jesus Aguilar on 28/03/2015.
 */
(function () {
  'use strict';

  angular
    .module('managers.autentication', [
      'managers.autentication.controllers',
      'managers.autentication.services'
    ]);

  angular
    .module('managers.autentication.controllers', []);

  angular
    .module('managers.autentication.services', ['ngCookies']);
})();