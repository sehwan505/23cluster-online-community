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
	path('like_post/<int:post_id>/', views.post_like),
	path('like_comment/<int:comment_id>/', views.comment_like),
	path('upload_image/', views.upload_image),
]