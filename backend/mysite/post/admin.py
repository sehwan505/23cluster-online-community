from django.contrib import admin

from .models import CommentReport, Post, Comment, PostReport

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostReport)
admin.site.register(CommentReport)

