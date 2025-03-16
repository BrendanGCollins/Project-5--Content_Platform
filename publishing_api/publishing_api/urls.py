# Import the admin site for the Django admin interface.
from django.contrib import admin

# Import 'path' and 'include' to create URLs and include other URL files.
from django.urls import path, include

# Define the URL patterns for the project.
urlpatterns = [
    # The admin site is available at '/admin/'.
    path('admin/', admin.site.urls),
    
    # Include the URL patterns from the articles app under '/api/'.
    # This means that any URL starting with 'api/' will be handled by the articles app URLs.
    path('api/', include('articles.urls')),
]