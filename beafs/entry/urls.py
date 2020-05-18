from django.urls import path, include
from . import views


app_name = 'entry'
urlpatterns = [
    path('', views.log_in, name='log_in'),
    path('sign_up/', views.sign_up, name='sign_up'),
]
