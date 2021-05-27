from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from .views import resign_user, current_user, UserList, ProfileUpdateAPI, refresh_category

urlpatterns = [
	path('login/', obtain_jwt_token),
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
	path('', UserList.as_view()),
    path('current/', current_user),
    path("profile/<int:user_pk>/update/", ProfileUpdateAPI.as_view()),
	path('resign/', resign_user),
	path('refresh_category/', refresh_category)
]