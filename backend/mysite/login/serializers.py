from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('username', 'user_pk')

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

class CommentRelatedField(serializers.RelatedField): #user_like_comment를 serilizing하기 위한 필드 만들기
    def to_representation(self, instance):
        return instance.comment_id
class PostRelatedField(serializers.RelatedField): #user_like_comment를 serilizing하기 위한 필드 만들기
    def to_representation(self, instance):
        return instance.id

#profile 
class ProfileSerializer(serializers.ModelSerializer):
    user_comment_like = CommentRelatedField(many=True, read_only=True)
    user_comment_unlike = CommentRelatedField(many=True, read_only=True)
    user_commentlist = CommentRelatedField(many=True, read_only=True)
    user_post_like = PostRelatedField(many=True, read_only=True)
    user_post_unlike = PostRelatedField(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('user_pk' ,'username','introduction','user_comment_like', 'user_comment_unlike', 'user_commentlist','user_post_like', 'user_post_unlike' ,'category', 'point')