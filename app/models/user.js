import DS from 'ember-data';

export default DS.Model.extend({
  name     : DS.attr('string'),
  email    : DS.attr('string'),
  username : DS.attr('string'),
  friends  : DS.hasMany("user",     { async: true }),
  favItems : DS.hasMany("menuItem", { inverse: 'favUsers' }),
  groups   : DS.hasMany("group",    { inverse: 'members' })
});
