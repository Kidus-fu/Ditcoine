from django.urls import path
from .views import (
    UsermoreListCreateView, UsermoreDetailView,
    CatogoresListCreateView, CatogoresDetailView,
    NewsListCreateView, NewsDetailView,
    CommentListCreateView, CommentDetailView ,RegisterView
)

urlpatterns = [
    #URL for register
    path('register/', RegisterView.as_view(), name='register'),

    # URLs for usermore model
    path('usermore/', UsermoreListCreateView.as_view(), name='usermore-list-create'),
    path('usermore/<int:pk>/', UsermoreDetailView.as_view(), name='usermore-detail'),

    # URLs for catogores model
    path('catogores/', CatogoresListCreateView.as_view(), name='catogores-list-create'),
    path('catogores/<int:pk>/', CatogoresDetailView.as_view(), name='catogores-detail'),

    # URLs for news model
    path('news/', NewsListCreateView.as_view(), name='news-list-create'),
    path('news/<int:pk>/', NewsDetailView.as_view(), name='news-detail'),

    # URLs for comment model
    path('comment/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comment/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]
