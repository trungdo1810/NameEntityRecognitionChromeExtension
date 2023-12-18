from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^receive_text/$', views.receive_text, name='receive_text'),
]