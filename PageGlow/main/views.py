from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'main/index.html')

def log_in(request):
    return render(request, 'register/log_in.html')