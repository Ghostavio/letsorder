import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('group');
  this.route('group/new');
  this.route('group/restaurants',    { path: 'group/:id' });
  this.route('group/new-restaurant', { path: 'group/:group_id/new' });
  this.route('group/order',          { path: 'group/:group_id/restaurant/:restaurant_id/order' });
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    var currentURL = this.get('url');
    if(currentURL !== '/') {
      this.router.currentHandlerInfos[0].handler.controller.set('dontShowHeader', false);
    } else {
      this.router.currentHandlerInfos[0].handler.controller.set('dontShowHeader', true);
    }
    return window.ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
});

export default Router;
