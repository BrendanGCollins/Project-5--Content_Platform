# Import the models module from Django's database library.
from django.db import models

# Define the Article model.
class Article(models.Model):
    title = models.CharField(max_length=120)  
    # 'content' field: a text field for the full article content.
    content = models.TextField()
    
    # 'created_at' field: a date and time field that automatically records
    created_at = models.DateTimeField(auto_now_add=True)

    # Define the string representation of the Article model.
    def __str__(self):
        return self.title