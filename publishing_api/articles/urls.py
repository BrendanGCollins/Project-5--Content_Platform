# Import the 'path' function to create URL patterns.
from django.urls import path

# Import API views and the home view from the articles app.
from .views import (
    home,
    ArticleListCreateAPIView,
    ArticleUpdateAPIView,
    ArticleDeleteAPIView,
    ArticleVoteAPIView,
    ArticleSearchAPIView,
)

urlpatterns = [
    # Home view to render the home.html template.
    path('', home, name='home'),
    # Endpoint for listing and creating articles.
    path('articles/', ArticleListCreateAPIView.as_view(), name='article-list-create'),
    # Endpoint for updating an article.
    path('articles/<int:pk>/update/', ArticleUpdateAPIView.as_view(), name='article-update'),
    # Endpoint for deleting an article.
    path('articles/<int:pk>/delete/', ArticleDeleteAPIView.as_view(), name='article-delete'),
    # Endpoint for voting on an article.
    path('articles/<int:pk>/vote/', ArticleVoteAPIView.as_view(), name='article-vote'),
    # Endpoint for searching articles by title and category.
    path('articles/search/', ArticleSearchAPIView.as_view(), name='article-search'),
]
