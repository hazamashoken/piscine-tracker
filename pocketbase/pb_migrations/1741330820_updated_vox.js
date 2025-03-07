/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number327566230",
    "max": null,
    "min": null,
    "name": "vox1",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number327566230",
    "max": null,
    "min": null,
    "name": "vox",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
