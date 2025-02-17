/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // remove field
  collection.fields.removeById("number2773902384")

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2773902384",
    "max": 0,
    "min": 0,
    "name": "final_mark",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2773902384",
    "max": null,
    "min": null,
    "name": "final_mark",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text2773902384")

  return app.save(collection)
})
