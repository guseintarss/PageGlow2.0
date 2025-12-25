
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('log_in.html', views.log_in)
]
