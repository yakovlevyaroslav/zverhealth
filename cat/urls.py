from django.urls import path

from cat import views

urlpatterns = [
    path('', views.index, name='index'),
    path('publish/<int:cat_image_id>/', views.publish, name='publish'),
    path('gallery/', views.gallery, name='gallery'),
]
