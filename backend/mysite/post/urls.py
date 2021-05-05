from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListPost.as_view()),
    path('detail/<int:pk>/', views.DetailPost.as_view()),
    path('detail_comment/<int:pk>/', views.DetailComment.as_view()),
    path('delete/<int:pk>/', views.DeletePost),
    path('delete_comment/<int:pk>/', views.DeleteComment),
    path('add/', views.AddPost),
    path('add_comment/<int:pk>/', views.AddComment),
]