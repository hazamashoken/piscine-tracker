/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3236327732",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "corrector",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3470601455",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "corrected",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // remove field
  collection.fields.removeById("relation3236327732")

  // remove field
  collection.fields.removeById("relation3470601455")

  return app.save(collection)
})
