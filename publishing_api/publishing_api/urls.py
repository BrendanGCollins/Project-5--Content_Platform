# Import the admin site for the Django admin interface.
from django.contrib import admin

# Import 'path' and 'include' to create URLs and include other URL files.
from django.urls import path, include

# Import the home view from the articles app.
from articles.views import home

# Define the URL patterns for the project.
urlpatterns = [
    # Root URL now points to the home view.
    path('', home, name='home'),
    
    # The admin site is available at '/admin/'.
    path('admin/', admin.site.urls),
    
    # Include the URL patterns from the articles app under '/api/'.
    path('api/', include('articles.urls')),
]
