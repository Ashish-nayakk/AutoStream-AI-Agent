from langchain_community.vectorstores import FAISS
from langchain.embeddings.base import Embeddings

# Dummy embedding (since Groq doesn't provide embeddings)
class DummyEmbeddings(Embeddings):
    def embed_documents(self, texts):
        return [[float(len(t))] for t in texts]

    def embed_query(self, text):
        return [float(len(text))]

def load_vectorstore():
    embeddings = DummyEmbeddings()
    return FAISS.load_local("vectorstore", embeddings, allow_dangerous_deserialization=True)

vectorstore = load_vectorstore()

def retrieve_context(query: str) -> str:
    docs = vectorstore.similarity_search(query, k=2)
    return "\n".join([d.page_content for d in docs])