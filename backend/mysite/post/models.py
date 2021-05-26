from django.db import models
from mysite import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import login.models as login

# Create your models here.
class Betting(models.Model):
   point = models.PositiveIntegerField(default=0)
   post_id = models.CharField(max_length=20)
   betting_question = models.CharField(max_length=20, null=True)
   betting_left = models.CharField(max_length=10, null=True)
   betting_right = models.CharField(max_length=10, null=True)
   participants_left = models.ManyToManyField(User)

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(login.Profile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    writer_id = models.CharField(max_length=20, null=True)
    writer_name = models.CharField(max_length=20, null=True)
    category = models.PositiveIntegerField(default=0)
    section = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    like_num = models.PositiveIntegerField(default=0, blank=True)
    view_num = models.PositiveIntegerField(default=0)
    #betting = models.OneToOneField(Betting, on_delete=models.CASCADE, null=True)
    hashtag1 = models.CharField(default="", max_length=10)
    hashtag2 = models.CharField(default="", max_length=10)
    hashtag3 = models.CharField(default="", max_length=10)
	

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(login.Profile, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, limit_choices_to = {'is_published' : True})
    content = models.TextField()
    writer_id = models.CharField(max_length=20)
    writer_name = models.CharField(max_length=20, null=True)
    parent_comment_id = models.IntegerField(default=0)
    mention = models.CharField(max_length=6, null=True)
    depth = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    like_num = models.PositiveIntegerField(default=0, blank=True)
    unlike_num = models.PositiveIntegerField(default=0, blank=True)
