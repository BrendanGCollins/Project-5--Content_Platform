# Import generics from Django REST Framework.
from rest_framework import generics

# Import the Article model from the current app's models.
from .models import Article

# Import the ArticleSerializer to convert Article instances to/from JSON.
from .serializers import ArticleSerializer

# Define the ArticleListCreateAPIView class.
class ArticleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer