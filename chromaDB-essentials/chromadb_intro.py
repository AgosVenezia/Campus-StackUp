import chromadb
client = chromadb.Client()
collection = client.create_collection("my_simple_collection")

# Prepare the data as separate lists for IDs, embeddings, 
#and metadata
# Keeping things simple with only two items for clarity

ids = ["1", "2"]

embeddings = [
    [1.0, 0.0, 0.0],  # Vector representing item 1
    [0.0, 1.0, 0.0]   # Vector representing item 2
]

metadata = [
    {"info": "This is the first item."},
    {"info": "This is the second item."}
]

# Upsert the data into the collection
collection.upsert(
    ids=ids,
    embeddings=embeddings,
    metadatas=metadata
)

# We'll create a vector close to the first item to see if it 
#matches correctly
# A vector close to the first item
query_embedding = [0.9, 0.1, 0.0]  
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=1  # Return the top 1 result
)

# Display the result
print("Most similar item:", results["metadatas"])  