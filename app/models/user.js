import DS from 'ember-data';

export default DS.Model.extend({
  name      : DS.attr('string'),
  email     : DS.attr('string'),
  username  : DS.attr('string'),
  phone     : DS.attr('string'),
  friends   : DS.hasMany("user",      { async: true }),
  favItems  : DS.hasMany("menu-item", { inverse: 'favUsers', async: true }),
  addresses : DS.hasMany("address",   { async: true }),
  groups    : DS.hasMany("group",     { inverse: 'members', async: true })
});
