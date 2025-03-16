# Import the serializers module from Django REST Framework.
from rest_framework import serializers

# Import the Article model from the current app's models.
from .models import Article

# Define the ArticleSerializer class that converts Article model
# to and from JSON.
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'