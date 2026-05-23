from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from collections import defaultdict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: list
    edges: list


def check_dag(nodes, edges):

    graph = defaultdict(list)

    for edge in edges:

        source = edge.get("source")
        target = edge.get("target")

        graph[source].append(target)

    visited = set()
    recursion_stack = set()

    def dfs(node):

        visited.add(node)
        recursion_stack.add(node)

        for neighbour in graph[node]:

            if neighbour not in visited:

                if dfs(neighbour):
                    return True

            elif neighbour in recursion_stack:
                return True

        recursion_stack.remove(node)

        return False

    for node in nodes:

        node_id = node["id"]

        if node_id not in visited:

            if dfs(node_id):
                return False

    return True


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    num_nodes = len(pipeline.nodes)

    num_edges = len(pipeline.edges)

    is_dag = check_dag(
        pipeline.nodes,
        pipeline.edges
    )

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }