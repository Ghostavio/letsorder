import DS from 'ember-data';

export default DS.Model.extend({
  createdAt  : DS.attr('date'),
  items      : DS.hasMany("menu-item", { async: true }),
  order      : DS.belongsTo("order",   { async: true }),
  user       : DS.belongsTo("user",    { async: true })
});
