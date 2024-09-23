from django.contrib.auth.models import User
from django.db import models

#news
#catogors
#usermore
class usermore(models.Model):
    userName = models.CharField(max_length=100)
    Phone = models.CharField(max_length=100,blank=True,null=True)
    DayOfBirth = models.CharField(max_length=100,blank=True,null=True)
    Telegrame = models.URLField(blank=True,null=True)
    Contrey = models.CharField(max_length=200,blank=True,null=True)

    def __str__(self) -> str:
        return f"{self.userName}"
class Catogores(models.Model):
    catogore = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.catogore
class News(models.Model):
    catogore = models.ForeignKey(Catogores,on_delete=models.CASCADE,related_name="News")
    Title = models.CharField(max_length=200)
    discrption = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.catogore} {self.Title}"

class Comment(models.Model):
    NewsComment = models.ForeignKey(News,on_delete=models.CASCADE,related_name="comment")
    comment = models.CharField(max_length=500)
    user = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user} : {self.comment} to {self.NewsComment}"
