from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [
    path('register', views.Registration_View, name='register'),
    path('login', views.login_view, name='login'),
    path('verify', views.VerifyNotice_View, name='verify_notice'),
]
