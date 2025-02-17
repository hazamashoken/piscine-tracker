/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // remove field
  collection.fields.removeById("text3206337475")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3206337475",
    "max": 0,
    "min": 0,
    "name": "version",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
