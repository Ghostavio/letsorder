import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

// the custom authenticator that initiates the authentication process with Facebook
var FacebookAuthenticator = Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.accessToken)) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  authenticate: function(router) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var connected,
          invokeDialog = router.controllerFor('login').get('invokeDialog'),
          permissions = 'email,public_profile,user_friends',
          permissionsArray = permissions.split(','),
          fireAuth = function(token) {
            window.FB.api('/me/', function(r) { router.controllerFor('user').login(r.email, token); });
          },
          facebookLogin = function(permissions,resetLocalStorage) {
            window.FB.login(function(fbResponse) {
              if (fbResponse.authResponse) {
                Ember.run(function() {
                  var accessToken = fbResponse.authResponse.accessToken,
                      userID = fbResponse.authResponse.userID;
                  resolve({ accessToken: accessToken, userID: userID });
                  fireAuth(accessToken);
                  connected = true;
                  if(resetLocalStorage) {
                    router.controllerFor('permission').get('model').forEach(function(i) {
                      i.destroyRecord();
                    });
                    handlePermission(permissionsArray);
                  }
                });
              } else {
                reject();
              }
            }, {scope: permissions});
          },
          permissionMapper = function(array) {
            var map = {};
            for(var i = 0, i_l = array.length;i < i_l; i++) {
              var obj = array[i];
              map[obj.permission] = obj.status;
            }
            return map;
          },
          handlePermission = function(permissionsArray) {
            var goToMissingPermissionPage = false;
            window.FB.api(
              "/me/permissions/",
              function (response) {
                if (response && !response.error) {
                  var mappedPermissions = permissionMapper(response.data);
                  permissionsArray.forEach(function(i) {
                    if(mappedPermissions[i] !== 'granted') {
                      var newPermission = router.store.createRecord('permission', {
                        name: i
                      });
                      newPermission.save();
                      goToMissingPermissionPage = true;
                    }
                  });
                  if(goToMissingPermissionPage) {
                    // router.transitionTo('permission');
                    facebookLogin(permissions, true);
                  }
                }
              }
            );
          };
      if(invokeDialog) {
        facebookLogin(permissions);
      } else {
        window.FB.getLoginStatus(function(fbResponse) {
          if (fbResponse.status === 'connected') {
            connected = true;
            Ember.run(function() {
              var accessToken = fbResponse.authResponse.accessToken,
                  userID = fbResponse.authResponse.userID;
              resolve({ accessToken: accessToken, userID: userID });
              fireAuth(accessToken);
            });
          } else {
            facebookLogin(permissions);
          }
        });
        if(connected) {
          handlePermission(permissionsArray, true);
        }
      }
    });
  }
});

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: function(container) {
    // register the Facebook and Google+ authenticators so the session can find them
    container.register('authenticator:facebook', FacebookAuthenticator);
    // container.register('authenticator:googleplus', App.GooglePlusAuthenticator);
  }
};
