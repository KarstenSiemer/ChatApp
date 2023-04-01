migrate((db) => {
  const collection = new Collection({
    "id": "xbi6jzel44eqgde",
    "created": "2023-04-03 08:46:34.465Z",
    "updated": "2023-04-03 08:46:34.465Z",
    "name": "groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ieniacc7",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 64,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde");

  return dao.deleteCollection(collection);
})
