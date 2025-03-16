# Import generics from Django REST Framework.
from rest_framework import generics

# Import HttpResponse to return a simple text response for the homepage.
from django.http import HttpResponse

# Import the Article model from the current app's models.
from .models import Article

# Import the ArticleSerializer to convert Article instances to/from JSON.
from .serializers import ArticleSerializer

# Define the ArticleListCreateAPIView class.
# This view handles listing all articles and creating new ones.
class ArticleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer

# Define a simple home view for the default homepage.
def home(request):
    return HttpResponse("Welcome to the Community Publishing Platform API!")