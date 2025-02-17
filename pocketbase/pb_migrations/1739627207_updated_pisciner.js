/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_ZqV86lwTXG` ON `pisciner` (`login`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
