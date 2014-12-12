import Ember from 'ember';

export default Ember.Controller.extend({
  fetchFriends: function(user) {
    if(this.get('session').isAuthenticated) {
      var self = this;
      window.FB.api('/me/friends/', function(r) {
        r.data.forEach(function(i) {
          self.store.find('user', i.id).then(function(friend){
            user.get('friends').then(function(v){
              if(v.filterBy("id", friend.id.toString()).length === 0) {
                v.pushObject(friend);
                user.save();
              }
            });

            friend.get('friends').then(function(x){
              if(x.filterBy("id", user.id.toString()).length === 0) {
                x.pushObject(user);
                friend.save();
              }
            });
          });
        });
      });
    }
  }
});
