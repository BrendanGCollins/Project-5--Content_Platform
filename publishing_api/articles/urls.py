# Import the 'path' function to create URL patterns.
from django.urls import path

# Import the home view and the view that handles listing/creating articles.
from .views import home, ArticleListCreateAPIView

# Define the URL patterns for the articles app.
urlpatterns = [
    # When someone visits the root URL (''), the home view is used.
    path('', home, name='home'),
    # When someone visits 'articles/', use the ArticleListCreateAPIView.
    path('articles/', ArticleListCreateAPIView.as_view(), name='article-list-create'),
]