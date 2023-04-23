migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2esmyezovlmdi0j")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5tyswgg5",
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
  const collection = dao.findCollectionByNameOrId("2esmyezovlmdi0j")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5tyswgg5",
    "name": "messageID",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "5d8n7q4b1wfzben",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
