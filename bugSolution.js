```javascript
// Assuming you're using the MongoDB Node.js driver

const { MongoClient } = require('mongodb');

async function updateDocument() {
  const uri = "mongodb://localhost:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    const result = await collection.updateOne(
      { name: 'John Doe' },
      { $set: { age: 30, address: { street: '123 Main St' } } },
      { upsert: true }
    );

    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
    } else if (result.upsertedCount === 1) {
      console.log('Document inserted successfully');
    } else {
      console.log('No document matched or upserted');
    }
  } catch (error) {
    console.error('Error updating document:', error);
  } finally {
    await client.close();
  }
}

updateDocument().catch(console.dir);
```