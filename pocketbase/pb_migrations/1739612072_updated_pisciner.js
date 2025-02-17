/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number1026318960",
    "max": null,
    "min": null,
    "name": "pool_year",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1720216100",
    "max": 0,
    "min": 0,
    "name": "pool_month",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1542800728",
    "max": 0,
    "min": 0,
    "name": "field",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // remove field
  collection.fields.removeById("number1026318960")

  // remove field
  collection.fields.removeById("text1720216100")

  // remove field
  collection.fields.removeById("text1542800728")

  return app.save(collection)
})
