/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_nmngQe0Om3` ON `team` (`users`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
