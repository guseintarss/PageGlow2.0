from django.urls import path
from . import views

urlpatterns = [
    path('register/log_in.html', views.register, name='register'),
]
