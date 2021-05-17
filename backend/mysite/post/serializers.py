from rest_framework import serializers
from .models import Post,Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'writer_id',
            'writer_name',
            'title',
            'content',
            'section',
			'created_at',
        )
        model = Post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'comment_id',
            'writer_id',
            'writer_name',
            'content',
            'depth',
            'parent_comment_id',
			'like_num',
			'created_at'
        )
        model = Comment