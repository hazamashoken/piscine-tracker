/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1417903265")

  // update collection data
  unmarshal({
    "name": "tutor"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1417903265")

  // update collection data
  unmarshal({
    "name": "tutors"
  }, collection)

  return app.save(collection)
})
