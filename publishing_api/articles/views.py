# Import generics from Django REST Framework.
from rest_framework import generics

# Import render to render HTML templates.
from django.shortcuts import render

# Import the Article model from the current app's models.
from .models import Article

# Import the ArticleSerializer to convert Article instances to/from JSON.
from .serializers import ArticleSerializer

# Define the ArticleListCreateAPIView class.
# This view handles listing all articles and creating new ones.
class ArticleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer

# Define the home view for the default homepage.
# This view fetches all articles and renders the home.html template.
def home(request):
    # Retrieve all articles, ordered by most recent first.
    articles = Article.objects.all().order_by('-created_at')
    # Render the 'home.html' template and pass the articles to it.
    return render(request, 'home.html', {'articles': articles})