/**
 * Created by zhushengfeng.bx on 2016/2/22.
 */
angular.module('ionicApp', ['ionic', 'ionicApp.controllers', 'ionicApp.services'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.tab', {
                url: '/tab',
                abstract: true,
                views: {
                    'menu-content': {
                        templateUrl: 'templates/tabs.html'
                    },
                    'menu-left': {
                        templateUrl: 'templates/menu-auth.html',
                        controller: 'MenuCtrl'
                    }
                }
            })

            .state('app.journal', {
                url: '/journal/:journal',
                views: {
                    'menu-content': {
                        templateUrl: 'templates/tab-feed.html',
                        controller: 'JournalCtrl'
                    },
                    'menu-left': {
                        templateUrl: 'templates/menu-anon.html'
                    }
                }
            })

            .state('app.journal-post', {
                url: '/journal/:journal/:postId',
                views: {
                    'menu-content': {
                        templateUrl: 'templates/view-post.html',
                        controller: 'PostCtrl'
                    }
                }
            })

            .state('app.tab.journal', {
                url: '/journal/:journal',
                views: {
                    'tab-journal': {
                        templateUrl: 'templates/tab-feed.html',
                        controller: 'JournalCtrl'
                    }
                }
            })

            .state('app.tab.journal-post', {
                url: '/journal/:journal/:postId',
                views: {
                    'tab-journal': {
                        templateUrl: 'templates/view-post.html',
                        controller: 'PostCtrl'
                    }
                }
            })

            .state('app.tab.friends', {
                url: '/friends/posts',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/tab-feed.html',
                        controller: 'FriendsCtrl'
                    }
                }
            })

            .state('app.tab.friends-post', {
                url: '/friends/posts/:postId',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/view-post.html',
                        controller: 'PostCtrl'
                    }
                }
            })

            .state('app.tab.favourites', {
                url: '/favourites',
                views: {
                    'tab-favourites': {
                        templateUrl: 'templates/tab-favourites.html',
                        controller: 'FavouritesCtrl'
                    }
                }
            })

            .state('app.tab.messages', {
                url: '/messages',
                views: {
                    'tab-messages': {
                        templateUrl: 'templates/messages/tab-messages.html',
                        controller: 'MessagesCtrl'
                    }
                }
            })

            .state('app.tab.messages.all', {
                url: '/all',
                views: {
                    'tab-messages-all': {
                        templateUrl: 'templates/messages/tab-message-list.html',
                        controller: 'MessageListCtrl'
                    }
                },
                resolve: {
                    mode: function () {
                        return 'all';
                    }
                }
            })

            .state('app.tab.messages.all-view', {
                url: '/all/:id',
                views: {
                    'tab-messages-all': {
                        templateUrl: 'templates/messages/view-message.html',
                        controller: 'MessageViewCtrl'
                    }
                },
                resolve: {
                    mode: function () {
                        return 'all';
                    }
                }
            })

            .state('app.tab.messages.sent', {
                url: '/sent',
                views: {
                    'tab-messages-sent': {
                        templateUrl: 'templates/messages/tab-message-list.html',
                        controller: 'MessageListCtrl'
                    }
                },
                resolve: {
                    mode: function () {
                        return 'sent';
                    }
                }
            })

            .state('app.tab.messages.sent-view', {
                url: '/sent/:id',
                views: {
                    'tab-messages-sent': {
                        templateUrl: 'templates/messages/view-message.html',
                        controller: 'MessageViewCtrl'
                    }
                },
                resolve: {
                    mode: function () {
                        return 'sent';
                    }
                }
            })

            .state('app.tab.messages.flagged', {
                url: '/flagged',
                views: {
                    'tab-messages-flagged': {
                        templateUrl: 'templates/messages/tab-message-list.html',
                        controller: 'MessageListCtrl'
                    }
                },
                resolve: {
                    mode: function () {
                        return 'flagged';
                    }
                }
            })

            .state('app.tab.messages.flagged-view', {
                url: '/flagged/:id',
                views: {
                    'tab-messages-flagged': {
                        templateUrl: 'templates/messages/view-message.html',
                        controller: 'MessageViewCtrl'
                    }
                },
                resolve: {
                    mode: function () {
                        return 'flagged';
                    }
                }
            });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var path = '/app/journal/';
            var cs = $injector.get('ConfSrvc');
            var as = $injector.get('AuthSrvc');
            if (as.logged_in) {
                path = '/app/tab/journal/';
            }
            $location.path(path + cs.current);
        });

    });