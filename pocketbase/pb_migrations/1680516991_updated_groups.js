migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tascp9lp",
    "name": "messages",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "5d8n7q4b1wfzben",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  // remove
  collection.schema.removeField("tascp9lp")

  return dao.saveCollection(collection)
})
