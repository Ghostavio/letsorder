import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  init: function() {
    this._super();
    try {
      var appId = "",
          clientKey = "";
      parsePlugin.initialize(appId, clientKey, function() {
        parsePlugin.getInstallationId(function(id) {
          alert(id);
        });
      });
    }
    catch(err) {
      alert('parse library not found');
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
