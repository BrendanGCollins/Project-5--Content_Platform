# Import Django's admin module for admin panel access
from django.contrib import admin

# Import 'path' and 'include' for URL routing
from django.urls import path, include

# Import TemplateView to serve React's frontend
from django.views.generic import TemplateView
import os

# Define URL patterns for the project
urlpatterns = [
    # The Django admin panel
    path("admin/", admin.site.urls),

    # Include API endpoints from the 'articles' app
    path("api/", include("articles.urls")),
]

# Serve React app for all other routes in production
if os.getenv("DJANGO_PRODUCTION", False):  # Only in production
    urlpatterns += [
        path("", TemplateView.as_view(template_name="index.html")),
    ]
