/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1233680144")

  // remove field
  collection.fields.removeById("text2254405824")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2254405824",
    "max": null,
    "min": null,
    "name": "duration",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1233680144")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2254405824",
    "max": 0,
    "min": 0,
    "name": "duration",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number2254405824")

  return app.save(collection)
})
