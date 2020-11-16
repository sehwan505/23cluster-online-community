from django.db import models

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    writer_id = models.CharField(max_length=20, null=True)
    writer_name = models.CharField(max_length=20, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        """A string representation of the model."""
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, limit_choices_to = {'is_published' : True})
    comment_id = models.AutoField(primary_key=True)
    content = models.TextField()
    writer_id = models.CharField(max_length=20)
    writer_name = models.CharField(max_length=20, null=True)
    parent_comment_id = models.IntegerField(default=0)
    depth = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)





