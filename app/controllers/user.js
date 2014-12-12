import Ember from 'ember';
import ENV from 'lets-order/config/environment';
var dbRef = new window.Firebase('https://' + ENV.modulePrefix + '.firebaseio.com');

export default Ember.Controller.extend({
  /**
  @property currentUser
  @type {User}
  @default null
  */
  needs: ['friend'],
  currentUser: null,
  permissions: 'email,public_profile,user_friends',

  /**
  Logs a user in with an email in password.
  If no arguments are given attempts to login a currently active session.
  If user does not exist or no user is logged in promise will resolve with null.

  @method login
  @param {String} email The users email
  @param {String} password The users password
  @return {Promise} Returns a promise that resolves with the logged in User
  */
  login: function(email, token) {
    // debugger;
    if (email === undefined) {
      return this._loginActiveSession(token);
    } else {
      return this._loginWithCredentials(email, token);
    }
  },

  /**

  @method logout
  @return {Promise} Returns a promise that resolves when the user is logged out.
  */
  logout: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run(function() {
        self.set('currentUser', null);
        dbRef.unauth();
        resolve(null);
      });
    });
  },

  /**

  @method createNewUser
  @param {String} email
  @param {String} password
  @return {Promise} Returns a promsie that resolves with newly created user
  */
  createNewUser: function(email) {
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve) {
      var authData = dbRef.getAuth();
      if (authData) {
        Ember.run(function() {
          var newUser = self.store.createRecord('user', {
            id: authData.facebook.id,
            email: email,
            name: authData.facebook.displayName
          });

          var appUser = newUser.save().then(function(value) {
            self.set('currentUser', value);
            self.get('controllers.friend').fetchFriends(value);
            return value;
          });

          resolve(appUser);
        });
      }

      // authClient.createUser(email, token, function(error, user) {
      //   Ember.run(function() {
      //     if (error) {
      //       reject(error);
      //     }

      //     if (user) {
      //       // authClient.login('password', {email: email, password: password});
      //       authClient.login("facebook", {
      //         rememberMe: true,
      //         access_token: token,
      //         scope: self.get('permissions')
      //       });
      //     }
      //   });
      // });
    });

    return promise;
  },

  _loginWithCredentials: function(email, token) {
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      dbRef.authWithOAuthToken("facebook", token, function(error, authData) {
        //First Time this fires error and user should be null. If connection successful
        //Second Time will be due to login. In that case we should have user or error
        Ember.run(function() {
          // Handle posible errors.
          if (error && error.code === 'INVALID_USER') {
            resolve(null);
          } else if (error) {
            reject(error);
          }

          // Handle user
          if (authData) {
            // var appUser = self.store.find('user', authData.facebook.id).then(function(appUser) {
            //   self.set('currentUser', appUser);
            //   return appUser;
            // }, function() {
              self.createNewUser(email, token);
            // });

            window.ga('set', '&uid', authData.facebook.id); // Set the user ID using signed-in user_id.
            resolve(authData);
          }
        });
      });
      // authClient.login("facebook", {
      //   rememberMe: true,
      //   access_token: token,
      //   scope: self.get('permissions')
      // });
    });

    return promise;
  },

  _loginActiveSession: function() {
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve) {
      var authData = dbRef.getAuth();
      if (authData) {
        // This callback should fire just once if no error or user than not logged in
        Ember.run(function() {
          if (authData) {
            var appUser = self.store.find('user', authData.facebook.id).then(function(value) {
              self.set('currentUser', value);
              self.get('controllers.friend').fetchFriends(value);
              return value;
            });

            resolve(appUser);
          }
        });
      }
    });

    return promise;
  }
});
