from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
    parser_classes,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import status, permissions
from rest_framework.response import Response
import json
from .models import Post, Comment, PostReport, CommentReport
from login.models import Profile
from .serializers import PostSerializer, CommentSerializer, PostListSerializer
from login.views import get_profile
from .pagination import ResultsSetPagination


class ListPost(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    # queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostListSerializer
    pagination_class = ResultsSetPagination

    def get_queryset(self, **kwargs):
        pk = self.kwargs.get("pk")
        category = self.kwargs.get("category")
        if pk == 5:
            queryset = Post.objects.filter(
                Q(section=pk) & Q(writer_category=category)
            ).order_by("-created_at")
        elif category >= 1 and category <= 4:
            queryset = Post.objects.filter(
                Q(section=pk) & Q(writer_category=category)
            ).order_by("-created_at")
        else:
            queryset = Post.objects.filter(section=pk).order_by("-created_at")
        return queryset


class DetailPost(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            "Expected view %s to be called with a URL keyword argument "
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            "attribute on the view correctly."
            % (self.__class__.__name__, lookup_url_kwarg)
        )
        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)
        obj.view_num += 1
        obj.save()
        self.check_object_permissions(self.request, obj)
        return obj


class SectionPost(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class DetailComment(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CommentSerializer
    pagination_class = ResultsSetPagination

    def get_queryset(self, **kwargs):
        pk = self.kwargs.get("pk")
        post = Post.objects.get(pk=pk)
        queryset = Comment.objects.filter(post=post).order_by("parent_comment_id")
        return queryset


@api_view(["POST"])
def DeleteComment(request, pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    serializer = CommentSerializer()

    return JsonResponse(
        {"comments": serializer.data}, safe=False, status=status.HTTP_201_CREATED
    )


@api_view(["DELETE"])
def DeletePost(request, pk):
    post = Post.objects.get(pk=pk)
    post.delete()
    serializer = PostSerializer()

    return JsonResponse(
        {"posts": serializer.data}, safe=False, status=status.HTTP_201_CREATED
    )


import re


def find_hashtag(hashtag):
    print(hashtag)
    pattern = "#([0-9a-zA-Z가-힣_-]*)"
    hash_w = re.compile(pattern)
    hash_tag = hash_w.findall(hashtag)
    list = ["", "", ""]
    j = 0
    for i in hash_tag:
        list[j] = i
        j += 1
    return list


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
@csrf_exempt
def AddPost(request):
    payload = json.loads(request.body)
    try:
        hashtag = find_hashtag(payload["hashtag"])
        post = Post.objects.create(
            title=payload["title"],
            content=payload["content"],
            writer_id=payload["writer_id"],
            writer_name=payload["writer_name"],
            writer_category=payload["writer_category"],
            section=payload["section"],
            hashtag1=hashtag[0],
            hashtag2=hashtag[1],
            hashtag3=hashtag[2],
        )
        profile = Profile.objects.get(user_pk=payload["writer_id"])
        profile.user_postlist.add(post)
        serializer = PostSerializer(post)
        return JsonResponse(
            {"posts": serializer.data}, safe=False, status=status.HTTP_201_CREATED
        )
    except ObjectDoesNotExist as e:
        return JsonResponse(
            {"error": str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND
        )
    except Exception:
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
@csrf_exempt
def AddComment(request, pk):
    payload = json.loads(request.body)
    post = Post.objects.get(pk=pk)
    try:
        if payload["depth"] == 0:
            comment = Comment.objects.create(
                post=post,
                content=payload["content"],
                writer_id=payload["writer_id"],
                writer_name=payload["writer_name"],
                writer_category=payload["writer_category"],
                depth=payload["depth"],
            )
            comment.parent_comment_id = comment.comment_id
            comment.save()
        else:
            comment = Comment.objects.create(
                post=post,
                content=payload["content"],
                writer_id=payload["writer_id"],
                writer_name=payload["writer_name"],
                writer_category=payload["writer_category"],
                parent_comment_id=payload["parent_comment_id"],
                depth=payload["depth"],
            )
        profile = Profile.objects.get(user_pk=payload["writer_id"])
        profile.user_commentlist.add(comment)
        serializer = CommentSerializer(comment)
        return JsonResponse(
            {"comments": serializer.data}, safe=False, status=status.HTTP_201_CREATED
        )

    except ObjectDoesNotExist as e:
        return JsonResponse(
            {"error": str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def post_like(request, post_id):
    try:
        post = get_object_or_404(Post, id=post_id)
        if post == 404:
            return JsonResponse(
                {"error": "Something terrible went wrong"},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        profile = get_profile(request.META["HTTP_AUTHORIZATION"][4:])
        temp = json.decoder.JSONDecoder().decode(post.category)
        if profile.category != 0:
            temp[profile.category - 1] += 1
        post.category = json.dumps(temp)
        profile.user_post_like.add(post)
        post.like_num += 1
        post.save()
        return JsonResponse({}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def post_unlike(request, post_id):
    try:
        post = get_object_or_404(Post, id=post_id)
        if post == 404:
            return JsonResponse(
                {"error": "Something terrible went wrong"},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        profile = get_profile(request.META["HTTP_AUTHORIZATION"][4:])
        temp = json.decoder.JSONDecoder().decode(post.category)
        if profile.category != 0:
            temp[profile.category - 1] -= 1
        post.category = json.dumps(temp)
        profile.user_post_unlike.add(post)
        post.like_num -= 1
        post.save()
        return JsonResponse({}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def comment_like(request, comment_id):
    try:
        comment = get_object_or_404(Comment, comment_id=comment_id)
        profile = get_profile(
            request.META["HTTP_AUTHORIZATION"][4:]
        )  # 앞의 JWT를 뗴고 token을 보냄
        check_like_comment = profile.user_comment_like.filter(comment_id=comment_id)
        if check_like_comment.exists():
            profile.user_comment_like.remove(comment)
            temp = json.decoder.JSONDecoder().decode(comment.category)
            if profile.category != 0:
                temp[profile.category - 1] -= 1
            comment.category = json.dumps(temp)
            comment.like_num -= 1
            comment.save()
        else:
            profile.user_comment_like.add(comment)
            temp = json.decoder.JSONDecoder().decode(comment.category)
            if profile.category != 0:
                temp[profile.category - 1] += 1
            comment.category = json.dumps(temp)
            comment.like_num += 1
            comment.save()
        return JsonResponse({}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def comment_unlike(request, comment_id):
    try:
        comment = get_object_or_404(Comment, comment_id=comment_id)
        profile = get_profile(
            request.META["HTTP_AUTHORIZATION"][4:]
        )  # 앞의 JWT를 뗴고 token을 보냄
        check_unlike_comment = profile.user_comment_unlike.filter(comment_id=comment_id)
        if check_unlike_comment.exists():
            profile.user_comment_unlike.remove(comment)
            comment.unlike_num -= 1
            comment.save()
        else:
            profile.user_comment_unlike.add(comment)
            comment.unlike_num += 1
            comment.save()
        return JsonResponse({}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


import boto3


@api_view(["POST"])
@parser_classes((MultiPartParser, FormParser))
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
@csrf_exempt
def upload_image(request):
    try:
        s3 = boto3.client("s3")
        # 업로드할 파일의 이름
        filename = request.data.get("image_name")
        # 업로드할 S3 버킷
        bucket_name = "23cluster"
        # 첫본째 매개변수 : 로컬에서 올릴 파일이름
        # 두번째 매개변수 : S3 버킷 이름
        # 세번째 매개변수 : 버킷에 저장될 파일 이름.
        s3.upload_fileobj(
            request.data.get("image"),
            bucket_name,
            filename,
            ExtraArgs={"ACL": "public-read"},
        )
        print(request.data)
        return Response(
            {"success": 1, "url": request.data.get("image_name")},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes((AllowAny,))
def search_query(request):
    posts = None
    query = None
    if request.GET["query"]:
        query = request.GET.get("query")
        posts = (
            Post.objects.all()
            .filter(Q(title__contains=query) | Q(content__contains=query))
            .order_by("-created_at")
        )
        # Q(one_line__contains=query) | Q(content_list__contains=query))
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(
            {"posts": serializer.data}, safe=False, status=status.HTTP_200_OK
        )
    else:
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


from django.db.models import Sum, Q
import datetime


@api_view(["GET"])
@permission_classes((AllowAny,))
def home_list(request):
    try:
        post = Post.objects.filter(
            created_at__gte=datetime.datetime.now() - datetime.timedelta(days=30)
        )
        serializer1 = PostListSerializer(
            post.filter(section=1).order_by("-view_num")[:7], many=True
        )
        serializer2 = PostListSerializer(
            post.filter(section=2).order_by("-view_num")[:7], many=True
        )
        serializer3 = PostListSerializer(
            post.filter(section=3).order_by("-view_num")[:7], many=True
        )
        serializer4 = PostListSerializer(
            post.filter(section=4).order_by("-view_num")[:7], many=True
        )
        return JsonResponse(
            {
                "section1": serializer1.data,
                "section2": serializer2.data,
                "section3": serializer3.data,
                "section4": serializer4.data,
            },
            safe=False,
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def profile_comment_post(request):
    profile = get_profile(request.META["HTTP_AUTHORIZATION"][4:])
    if profile != 0:
        serializer = CommentSerializer(profile.user_commentlist, many=True)
        serializer2 = PostSerializer(profile.user_postlist, many=True)
        if (profile.user_commentlist.count() == 0) and (
            profile.user_postlist.count() == 0
        ):  # 카운트로 NoneType인지 확인한다.
            return JsonResponse(
                {"error": "there is no post and comments"},
                safe=False,
                status=status.HTTP_404_NOT_FOUND,
            )
        elif profile.user_commentlist.count() == 0:
            profile.point = profile.user_postlist.aggregate(Sum("like_num"))[
                "like_num__sum"
            ]
            profile.save()
        elif profile.user_postlist.count() == 0:
            profile.point = (
                profile.user_commentlist.aggregate(Sum("like_num"))["like_num__sum"]
                - profile.user_commentlist.aggregate(Sum("unlike_num"))[
                    "unlike_num__sum"
                ]
            )
            profile.save()
        else:
            profile.point = (
                profile.user_commentlist.aggregate(Sum("like_num"))["like_num__sum"]
                - profile.user_commentlist.aggregate(Sum("unlike_num"))[
                    "unlike_num__sum"
                ]
                + profile.user_postlist.aggregate(Sum("like_num"))["like_num__sum"]
            )
            profile.save()
        return JsonResponse(
            {"comments": serializer.data, "posts": serializer2.data},
            safe=False,
            status=status.HTTP_200_OK,
        )
    else:
        return JsonResponse(
            {"error": "Something terrible went wrong"},
            safe=False,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def declare(request):
    try:
        payload = json.loads(request.body)
        if payload["post_id"] != 0:
            post = Post.objects.get(id=payload["post_id"])
            report = PostReport.objects.get_or_create(post=post)[0]
            report.count += 1
            report.save()
        elif payload["comment_id"] != 0:
            comment = Comment.objects.get(comment_id=payload["comment_id"])
            report = CommentReport.objects.get_or_create(comment=comment)[0]
            report.count += 1
            report.save()
        return Response({}, status=status.HTTP_200_OK)
    except ObjectDoesNotExist as e:
        Response({"error": e}, safe=False, status=status.HTTP_404_NOT_FOUND)
