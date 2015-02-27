import DS from 'ember-data';

export default DS.Model.extend({
  name           : DS.attr('string'),
  picture        : DS.attr('string'),
  phone          : DS.attr('string'),
  website        : DS.attr('string'),
  menuLink       : DS.attr('string'),
  deliveryCharge : DS.attr('number'),
  deliveryArea   : DS.attr('string'),
  minimumOrder   : DS.attr('number'),
  items          : DS.hasMany("menu-item", { async: true }),
  group          : DS.belongsTo("group",   { async: true }),
  user           : DS.belongsTo("user",    { async: true })
});
