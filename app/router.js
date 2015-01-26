import Ember from 'ember';
import config from './config/environment';

window.$.fn.removeClassPrefix = function(prefix) {
  this.each(function(i, el) {
    var classes = el.className.split(" ").filter(function(c) {
      return c.lastIndexOf(prefix, 0) !== 0;
    });
    el.className = window.$.trim(classes.join(" "));
  });
  return this;
};

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('group');
  this.route('group/new');
  this.route('group/restaurants',    { path: 'group/:id' });
  this.route('group/new-restaurant', { path: 'group/:group_id/new' });
  this.route('group/timer',          { path: 'group/:group_id/restaurant/:restaurant_id/timer' });
  this.route('group/order',          { path: 'group/:group_id/restaurant/:restaurant_id/order/:order_id' });
  this.route('group/summary',        { path: 'group/:group_id/restaurant/:restaurant_id/order/:order_id/summary' });
  this.route('setup');
  this.route('settings');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    var currentURL = this.get('url');
    window.$('body').removeClass('initial-load');
    if(currentURL !== '/') {
      this.router.currentHandlerInfos[0].handler.controller.set('dontShowHeader', false);
      var routeName = this.router.currentHandlerInfos[1].name.split('/').join('-');
      window.$('body').removeClassPrefix('style-').addClass('style-' + routeName);
    } else {
      this.router.currentHandlerInfos[0].handler.controller.set('dontShowHeader', true);
      window.$('body').removeClassPrefix('style-').addClass('style-index');
    }
    return window.ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
});

export default Router;
