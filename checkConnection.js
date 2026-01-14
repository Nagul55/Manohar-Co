const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function check() {
  try {
    await client.connect();
    console.log("✅ SUCCESS: Project is linked with MongoDB");

    const db = client.db("testDB");
    await db.collection("check").insertOne({ status: "connected" });

    console.log("✅ Test data inserted");
  } catch (err) {
    console.log("❌ FAILED: Project not linked");
    console.error(err);
  } finally {
    await client.close();
  }
}

check();
