from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from .serializers import UserSerializer, UserSerializerWithToken, ProfileSerializer
from .models import Profile
import json

def get_profile(token):
    try:
        jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        jwt_payload_get_user_id_handler = api_settings.JWT_PAYLOAD_GET_USER_ID_HANDLER

        payload = jwt_decode_handler(token)
        user_id = jwt_payload_get_user_id_handler(payload)
        profile = Profile.objects.get(user_pk=user_id)
        return profile
    except Exception as e:
        print(e)
        return 0

@api_view(['GET'])
@permission_classes((permissions.AllowAny, ))
@authentication_classes((JSONWebTokenAuthentication,))
def current_user(request):
    try:
        token = request.META['HTTP_AUTHORIZATION']
        user = get_profile(token)
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileUpdateAPI(generics.UpdateAPIView):
    permission_classes = (permissions.AllowAny,)

    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def resign_user(request):
    try:
        token = request.META['HTTP_AUTHORIZATION'][4:]
        user = get_profile(token)
        user.user.delete()
        user.delete()
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def signup(request):
    try:
        payload = json.loads(request.body)
        token = request.META['HTTP_AUTHORIZATION'][4:]
        user = get_profile(token)
        user.age = payload['age']
        user.sex = payload['sex']
        user.username = payload['nickname']
        user.save()
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

from sklearn.cluster import KMeans
import pandas as pd
import joblib
import os
from django.conf import settings
from django.db.models import Count

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def refresh_category(request):
    try:
        token = request.META['HTTP_AUTHORIZATION'][4:]
        user = get_profile(token)
        X = pd.DataFrame([[0, 0, 0, 0, 0, 0]], columns=['gender', 'age', 'category_1',  'category_2',  'category_3',  'category_4'])
        X["gender"] = user.gender
        X["age"] = user.age
        X["category_1"] = 0
        X["category_2"] = 0
        X["category_3"] = 0
        X["category_4"] = 0
        if (user.user_commentlist and user.user_comment_like):
            X["category_1"] = user.user_commentlist.filter(category = 1).count() + user.user_comment_like.filter(category = 1).count()
            X["category_2"] = user.user_commentlist.filter(category = 2).count() + user.user_comment_like.filter(category = 2).count()
            X["category_3"] = user.user_commentlist.filter(category = 3).count() + user.user_comment_like.filter(category = 3).count()
            X["category_4"] = user.user_commentlist.filter(category = 4).count() + user.user_comment_like.filter(category = 4).count()
        loaded_model = joblib.load(os.path.join(settings.BASE_DIR, './login/kms.pkl'))
        user.category = loaded_model.predict(X) + 1
        user.save()
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_ERROR)
