migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  collection.createRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
