import Ember from 'ember';
import { initialize } from 'lets-order/initializers/simple-auth-config';

var container, application;

module('SimpleAuthConfigInitializer', {
  setup: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});

