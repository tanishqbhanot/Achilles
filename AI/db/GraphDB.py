from langchain_neo4j import Neo4jGraph
import os

graph = Neo4jGraph(
    url=os.environ.get("NEO4J_URI", "neo4j://127.0.0.1:7687"),
    username=os.environ.get("NEO4J_USERNAME", "neo4j"),
    password=os.environ.get("NEO4J_PASSWORD"),   
    database="test",
    refresh_schema=False,
)