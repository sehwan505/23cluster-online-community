# Generated by Django 3.1.2 on 2021-04-29 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('login', '0001_initial'),
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='user_comment_like',
            field=models.ManyToManyField(blank=True, related_name='user_comment_like', to='post.Comment'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_commentlist',
            field=models.ManyToManyField(blank=True, related_name='user_commentlist', to='post.Comment'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_post_like',
            field=models.ManyToManyField(blank=True, related_name='user_post_like', to='post.Post'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_postlist',
            field=models.ManyToManyField(blank=True, related_name='user_postlist', to='post.Post'),
        ),
    ]