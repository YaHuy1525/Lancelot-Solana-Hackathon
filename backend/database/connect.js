const { MongoClient, ServerApiVersion } = require('mongodb');

const url = "mongodb+srv://miqua2308:OPEX123456@cluster0.wygg2oy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a client with the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Entry function
async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("lancelotDB");

    // Optional: Ensure collections exist
    const collections = await db.listCollections().toArray();
    const existing = collections.map(col => col.name);

    const needed = ["freelancers", "jobs", "reputations"];

    for (const name of needed) {
      if (!existing.includes(name)) {
        await db.createCollection(name);
        console.log(`✅ Created collection: ${name}`);
      } else {
        console.log(`ℹ️ Collection already exists: ${name}`);
      }
    }

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run().catch(console.dir);
