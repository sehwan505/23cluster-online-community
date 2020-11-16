from django.shortcuts import render,redirect
from rest_framework import generics
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status


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
    # user = request.user
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

