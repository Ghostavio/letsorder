import DS from 'ember-data';

export default DS.Model.extend({
  name        : DS.attr('string'),
  picture     : DS.attr('string'),
  members     : DS.hasMany("user",       { async: true }),
  restaurants : DS.hasMany("restaurant", { async: true }),
  addresses   : DS.hasMany("address",    { async: true }),  
  user        : DS.belongsTo("user",     { async: true }),
});
