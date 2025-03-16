# Import the 'path' function to create URL patterns.
from django.urls import path

# Import the view that handles listing and creating articles.
from .views import ArticleListCreateAPIView

# Define the URL patterns for the articles app.
urlpatterns = [
    # When someone goes to 'articles/', use the ArticleListCreateAPIView.
    path('articles/', ArticleListCreateAPIView.as_view(), name='article-list-create'),
]