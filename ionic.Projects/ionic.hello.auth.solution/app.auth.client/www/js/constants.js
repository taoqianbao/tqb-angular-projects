/**
 * Created by developer on 16-2-17.
 */
angular.module('starter')

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })

    .constant('API_ENDPOINT', {
        url: 'http://localhost:8100/api'
        //  For a simulator use: url: 'http://127.0.0.1:8080/api'
    });