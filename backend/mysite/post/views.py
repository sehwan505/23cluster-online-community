from django.shortcuts import render,redirect, get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
#from .firebase import print_app_name
import json
from django.core.exceptions import ObjectDoesNotExist
from .models import Post,Comment
from .serializers import PostSerializer, CommentSerializer

class ListPost(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailComment(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self, **kwargs):
        pk = self.kwargs.get('pk')
        print(pk)
        post = Post.objects.get(pk=pk)
        queryset = Comment.objects.filter(post=post).order_by('parent_comment_id')
        return queryset 

@api_view(["POST"])
def DeleteComment(request,pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    serializer = CommentSerializer()

    return JsonResponse({'comments': serializer.data}, safe=False, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def DeletePost(request,pk):
    post = Post.objects.get(pk=pk)
    post.delete()
    serializer = PostSerializer()

    return JsonResponse({'posts': serializer.data}, safe=False, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@csrf_exempt
def AddPost(request):
    payload = json.loads(request.body)
    print(payload)
    user = request.user
    print(user)
    try:
        post = Post.objects.create(
            title=payload["title"],
            content=payload["content"],
            writer_id=payload["writer_id"],
            writer_name=payload["writer_name"]
        )
        serializer = PostSerializer(post)
        return JsonResponse({'posts': serializer.data}, safe=False, status=status.HTTP_201_CREATED)

    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
@csrf_exempt
def AddComment(request,pk):
    payload = json.loads(request.body)
    print(payload)
    post = Post.objects.get(pk=pk)
    # user = request.user
    try:
        if payload["depth"] == 0:
            comment = Comment.objects.create(
                post = post,
                content=payload["content"],
                writer_id=payload["writer_id"],
                writer_name=payload["writer_name"],
                depth=payload["depth"],
            )
            comment.parent_comment_id = comment.comment_id
            comment.save()
        else:
            comment = Comment.objects.create(
                post = post,
                content=payload["content"],
                writer_id=payload["writer_id"],
                writer_name=payload["writer_name"],
                parent_comment_id=payload["parent_comment_id"],
                depth=payload["depth"]
            )
        print(comment.id)
        serializer = CommentSerializer(comment)
        return JsonResponse({'comments': serializer.data}, safe=False, status=status.HTTP_201_CREATED)

    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def post_like(request, post_id):
    try:
        post = get_object_or_404(Post, id = post_id)
        profile = Profile.objects.get(user=user)
        check_like_post = profile.user_post_like.filter(id=post_id)
        if check_like_post.exists():
            profile.user_post_like.remove(post)
            post.like_num -= 1
            post.save()
        else:
            profile.user_post_like.add(post)
            post.like_num += 1
            post.save()
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def comment_like(request, comment_id):
    try:
        comment = get_object_or_404(Comment, id = comment_id)
        profile = Profile.objects.get(user=user)
        check_like_post = profile.user_comment_like.filter(id=comment_id)
        if check_like_post.exists():
            profile.user_comment_like.remove(comment)
            comment.like_num -= 1
            comment.save()
        else:
            profile.user_post_like.add(post)
            comment.like_num += 1
            comment.save()
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)