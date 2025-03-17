# Import generics from Django REST Framework.
from rest_framework import generics, status
# Import APIView for custom view logic.
from rest_framework.views import APIView
# Import Response and status codes for API responses.
from rest_framework.response import Response

# Import render to render HTML templates.
from django.shortcuts import render, get_object_or_404

# Import the Article model from the current app's models.
from .models import Article
# Import the ArticleSerializer to convert Article instances to/from JSON.
from .serializers import ArticleSerializer


# View to list all articles and create a new article.
class ArticleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer


# View to update an article.
class ArticleUpdateAPIView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


# View to delete an article.
class ArticleDeleteAPIView(generics.DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


# View to vote on an article.
class ArticleVoteAPIView(APIView):
    def post(self, request, pk):
        # Retrieve the vote value from the request data.
        vote_value = int(request.data.get('vote', 0))
        # Get the article or return a 404 error if not found.
        article = get_object_or_404(Article, pk=pk)
        # Update the article's vote count.
        article.votes += vote_value
        article.save()
        # Return the updated vote count.
        return Response({'id': article.id, 'votes': article.votes},
                        status=status.HTTP_200_OK)


# View to search articles based on title and category.
class ArticleSearchAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all().order_by('-created_at')
        # Get search filters from query parameters.
        title = self.request.query_params.get('title')
        category = self.request.query_params.get('category')
        # Filter articles by title if provided.
        if title:
            queryset = queryset.filter(title__icontains=title)
        # Filter articles by category if provided.
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset


# Home view for the default homepage.
# This view fetches all articles and renders the home.html template.
def home(request):
    # Retrieve all articles, ordered by most recent first.
    articles = Article.objects.all().order_by('-created_at')
    # Render the 'home.html' template and pass the articles to it.
    return render(request, 'home.html', {'articles': articles})
