from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import post.models as post
from mysite import settings

class Profile(models.Model):
   user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)
   user_pk = models.IntegerField(blank=True, default=1)
   created_at = models.DateTimeField(auto_now_add=True)
   introduction = models.TextField(blank=True)
   gender = models.PositiveIntegerField(default=0, blank=True)
   age = models.PositiveIntegerField(default=0, blank=True)
   username = models.CharField(max_length=7,default="unknown")
   point = models.PositiveIntegerField(default=0, blank=True)
   category = models.PositiveIntegerField(default=0, blank=True)
   user_commentlist = models.ManyToManyField('post.Comment', blank=True, default=None , related_name='user_commentlist')
   user_comment_like = models.ManyToManyField('post.Comment', blank=True, default=None ,related_name='user_comment_like')
   user_comment_unlike = models.ManyToManyField('post.Comment', blank=True, default=None ,related_name='user_comment_unlike')
   user_postlist = models.ManyToManyField('post.Post', blank=True, default=None , related_name='user_postlist')
   user_post_like = models.ManyToManyField('post.Post', blank=True, default=None ,related_name='user_post_like')
   user_post_unlike = models.ManyToManyField('post.Post', blank=True, default=None ,related_name='user_post_unlike')

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance,  user_pk=instance.id)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
