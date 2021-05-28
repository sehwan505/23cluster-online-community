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

def check_category(category):
    category_list = []
    for i in range(4):
        category_list.append(category % 10)
        category /= 10

    return category_list.index(max(category_list)) + 1



class CommentSerializer(serializers.ModelSerializer):
    category_calculated = serializers.SerializerMethodField()
    
    def get_category_calculated(self, obj):
        category = obj.category
        if (category == 0):
            return 0
        category_list = []
        for i in range(4):
            category_list.append(category % 10)
            category /= 10
		
        return category_list.index(max(category_list)) + 1

    class Meta:
        fields = (
            'comment_id',
            'writer_id',
            'writer_name',
            'writer_category',
			'category_calculated',
            'content',
            'depth',
            'parent_comment_id',
			'like_num',
			'unlike_num',
			'created_at'
        )
        model = Comment