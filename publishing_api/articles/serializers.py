# Import the serializers module from Django REST Framework.
from rest_framework import serializers

# Import the Article and Comment models from the current app's models.
from .models import Article, Comment

# Define ArticleSerializer class that converts Article model to and from JSON.
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

# Define CommentSerializer class for converting Comment model to and from JSON.
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
