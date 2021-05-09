from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from .views import validate_jwt_token, current_user, UserList, ProfileUpdateAPI

urlpatterns = [
	path('login/', obtain_jwt_token),
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
	path('validate/', validate_jwt_token),
	path('', UserList.as_view()),
    path('current/', current_user),
    path("profile/<int:user_pk>/update/", ProfileUpdateAPI.as_view()),
]