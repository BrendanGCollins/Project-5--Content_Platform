# Import the models module from Django's database library.
from django.db import models

# Define the Article model.
class Article(models.Model):
    # 'title' field: a character field for the article's title (max 120 characters).
    title = models.CharField(max_length=120)
    # 'content' field: a text field for the full article content.
    content = models.TextField()
    # 'created_at' field: a datetime field that automatically records when the article is created.
    created_at = models.DateTimeField(auto_now_add=True)
    # 'votes' field: an integer field to store the number of votes (default is 0).
    votes = models.IntegerField(default=0)
    # 'category' field: a character field for categorizing the article.
    # This field is optional (can be blank or null).
    category = models.CharField(max_length=50, blank=True, null=True)
    # 'keywords' field: a character field to store keywords for searching/filtering.
    # This field is optional (can be blank or null).
    keywords = models.CharField(max_length=255, blank=True, null=True)

    # Define the string representation of the Article model.
    def __str__(self):
        return self.title


# Define the Comment model for storing comments on articles.
class Comment(models.Model):
    # Link each comment to an Article; if the article is deleted, its comments are also deleted.
    article = models.ForeignKey(
        Article, related_name='comments', on_delete=models.CASCADE
    )
    # Optional 'name' field: if provided, stores the commenter's name.
    # If left blank, the comment is considered anonymous.
    name = models.CharField(max_length=50, blank=True, null=True)
    # 'content' field: a text field for the comment text.
    content = models.TextField()
    # 'created_at' field: a datetime field that automatically records when the comment is created.
    created_at = models.DateTimeField(auto_now_add=True)

    # Define the string representation of the Comment model.
    def __str__(self):
        if self.name:
            return f"Comment by {self.name} on {self.article}"
        return f"Anonymous comment on {self.article}"
