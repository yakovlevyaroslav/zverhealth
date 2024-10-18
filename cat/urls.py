from django.urls import path

from cat import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_public_images/', views.get_public_images, name='get_public_images'),
]
