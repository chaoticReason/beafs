from django.urls import path
from . import views
from entry.views import log_in

urlpatterns = [
    path('<int:pk>/story/', views.story, name='story'),
    path('<int:pk>/music/', views.music, name='music'),
    path('<int:pk>/profile/', views.profile, name='profile'),
    path('<int:pk>/profile/<int:pl>', views.playlist, name='profile')
]
