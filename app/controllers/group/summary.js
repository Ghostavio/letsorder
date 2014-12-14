import Ember from 'ember';

export default Ember.Controller.extend({
  timer: function() {
    return this.get('model').get('timer');
  }.property('timer')
});
