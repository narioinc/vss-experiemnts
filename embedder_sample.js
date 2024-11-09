const { ChromaClient, OllamaEmbeddingFunction } = require("chromadb");
const client = new ChromaClient({path: "http://localhost:8001"});

const embedder = new OllamaEmbeddingFunction({
    url: "http://127.0.0.1:11434/api/embeddings",
    model: "mxbai-embed-large"
})
// use directly


var start = async function(){

    //const embeddings = await embedder.generate(["document1", "document2"])
    //console.log(embeddings)

    const collection = await client.getOrCreateCollection({
        name: "my_collection",
        //embeddingFunction: embedder
      });
    
      await collection.add({
        documents: [
          "This is a document about pineapple",
          "This is a document about oranges",
          "this is a document about mangos"
        ],
        ids: ["id1", "id2", "id3"],
      });
    
    
      const results = await collection.query({
        queryTexts: "This is a query document about hawaii", // Chroma will embed this for you
        nResults: 2, // how many results to return
      });
      console.log(results);

      const results2 = await collection.query({
        queryTexts: "This is a query document about florida", // Chroma will embed this for you
        nResults: 2, // how many results to return
      });
      console.log(results2);

      const results3 = await collection.query({
        queryTexts: "This is a query document about india", // Chroma will embed this for you
        nResults: 2, // how many results to return
      });
      console.log(results3);
      
}

start();