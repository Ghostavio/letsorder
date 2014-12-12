import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
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
