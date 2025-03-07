/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1724955765",
    "hidden": false,
    "id": "relation995698286",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "vox2_vote",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1724955765",
    "hidden": false,
    "id": "relation242765889",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "vox1_vote",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // remove field
  collection.fields.removeById("relation995698286")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1724955765",
    "hidden": false,
    "id": "relation242765889",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "vote_from",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
