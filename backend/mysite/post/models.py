from django.db import models
from mysite import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)
    created_at = models.DateTimeField(auto_now_add=True)
    introduction = models.TextField(blank=True)
    nickname = models.CharField(max_length=64)
    username = models.CharField(max_length=6,default="")
    point = models.PositiveIntegerField(default=0, blank=True)
    category = models.PositiveIntegerField(default=0, blank=True)
    user_commentlist = models.ManyToManyField('Comment', blank=True, related_name='user_commentlist')
    user_comment_like = models.ManyToManyField('Comment', blank=True, related_name='user_comment_like')
    user_postlist = models.ManyToManyField('Post', blank=True, related_name='user_postlist')
    user_post_like = models.ManyToManyField('Post', blank=True, related_name='user_post_like')
	#user_betting = models.ManyToManyField('Post', blank=True, related_name='user_likelist')

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    writer_id = models.CharField(max_length=20, null=True)
    writer_name = models.CharField(max_length=20, null=True)
    category = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    like_num = models.PositiveIntegerField(default=0, blank=True)

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, limit_choices_to = {'is_published' : True})
    content = models.TextField()
    writer_id = models.CharField(max_length=20)
    writer_name = models.CharField(max_length=20, null=True)
    parent_comment_id = models.IntegerField(default=0)
    depth = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    like_num = models.PositiveIntegerField(default=0, blank=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)