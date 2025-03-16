from django.contrib import admin
from .models import Article

# Register the Article model so it shows up in the Django admin.
admin.site.register(Article)