import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  init: function() {
    this._super();
    try {
      // var appId = "5c1HryUDUzd84egTCqW0zBMtWY9d2qZkyREXvW7F",
      //     clientKey = "l5jyv3QZdrGfzN0wNwyYhJ9TVjG9VugMkJhcdOR4";
      // window.parsePlugin.initialize(appId, clientKey, function() {
      //   window.parsePlugin.getInstallationId(function(id) {
      //     alert(id);
      //   });
      // });
      if (!window.plugins) {
          window.plugins = {};
      }

      if (!window.plugins.parsePlugin) {
          window.plugins.parsePlugin = window.cordova.require("cordova/plugin/parsePlugin");
      }
      console.debug("=============-----------================");
    }
    catch(err) {
      alert('parse library not found, error:' + err.message);
    }
    if(this.get('session').isAuthenticated) {
      var self = this,
          token = this.get('session').content.accessToken;
      window.FB.api('/me/', function(r) { self.controllerFor('user').login(r.email, token); });
    }
  },
  actions: {
    back: function() {
      history.back();
    },

    closeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },

    openModal: function(name) {
      this.render(name, {
        into: 'application',
        outlet: 'modal'
      });
    },

    openLink: function(url) {
      window.open(url, '_system');
    }
  }
});
