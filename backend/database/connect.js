const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://miqua2308:OPEX123456@cluster0.wygg2oy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a client with the Stable API version
const client = new MongoClient(uri, {
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

    // Optional: Create collections (Mongo will auto-create on first insert too)
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

    // Insert a test freelancer
    const freelancers = db.collection("freelancers");
    await freelancers.insertOne({
      wallet: "SoL4nA111Freelancer123",
      username: "test_freelancer",
      skills: ["web3", "smart contracts"],
      rating: 5,
    });
    console.log("✅ Inserted sample freelancer");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run().catch(console.dir);
