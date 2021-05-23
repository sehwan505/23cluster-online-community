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

def get_profile(token):
    try:
        jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        jwt_payload_get_user_id_handler = api_settings.JWT_PAYLOAD_GET_USER_ID_HANDLER

        payload = jwt_decode_handler(token)
        user_id = jwt_payload_get_user_id_handler(payload)
        profile = Profile.objects.get(user_pk=user_id)
        return profile
    except:
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
        return Response(e, status=status.HTTP_400_BAD_REQUEST)

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
def validate_jwt_token(request):
    print('a')
    try:
        token = request.META['HTTP_AUTHORIZATION']
        data = {'token': token}
        valid_data = VerifyJSONWebTokenSerializer().validate(data)
    except Exception as e:
        return Response(e)

    return Response(status=status.HTTP_200_OK)
