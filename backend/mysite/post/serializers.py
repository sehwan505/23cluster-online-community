from rest_framework import serializers
from .models import Post,Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'writer_id',
            'writer_name',
            'writer_category',			
            'title',
            'content',
            'section',
            'like_num',
            'created_at',
			'hashtag1',
			'hashtag2',
			'hashtag3',
        )
        model = Post

class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'writer_id',
            'writer_name',
            'writer_category',
            'title',
            'section',
            'like_num',
			'view_num',
            'created_at',
        )
        model = Post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'comment_id',
            'writer_id',
            'writer_name',
            'writer_category',
            'content',
            'depth',
            'parent_comment_id',
			'like_num',
			'unlike_num',
			'created_at'
        )
        model = Comment