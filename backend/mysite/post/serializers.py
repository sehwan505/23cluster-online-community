from rest_framework import serializers
from .models import Post, Comment
import json


class PostSerializer(serializers.ModelSerializer):
    category_calculated = serializers.SerializerMethodField()

    def get_category_calculated(self, obj):
        category = json.decoder.JSONDecoder().decode(obj.category)
        if sum(category) == 0:
            return 0
        return category.index(max(category)) + 1

    class Meta:
        fields = (
            "id",
            "writer_id",
            "writer_name",
            "writer_category",
            "category_calculated",
            "title",
            "content",
            "section",
            "like_num",
            "created_at",
            "hashtag1",
            "hashtag2",
            "hashtag3",
        )
        model = Post


class PostListSerializer(serializers.ModelSerializer):
    category_calculated = serializers.SerializerMethodField()

    def get_category_calculated(self, obj):
        category = json.decoder.JSONDecoder().decode(obj.category)
        print("category", category)
        if sum(category) == 0:
            return 0
        return category.index(max(category)) + 1

    class Meta:
        fields = (
            "id",
            "writer_id",
            "writer_name",
            "writer_category",
            "category_calculated",
            "title",
            "section",
            "like_num",
            "view_num",
            "created_at",
        )
        model = Post


class CommentSerializer(serializers.ModelSerializer):
    category_calculated = serializers.SerializerMethodField()

    def get_category_calculated(self, obj):
        category = json.decoder.JSONDecoder().decode(obj.category)
        if sum(category) == 0:
            return 0
        return category.index(max(category)) + 1

    class Meta:
        fields = (
            "comment_id",
            "writer_id",
            "writer_name",
            "writer_category",
            "category_calculated",
            "content",
            "depth",
            "parent_comment_id",
            "like_num",
            "unlike_num",
            "created_at",
        )
        model = Comment
