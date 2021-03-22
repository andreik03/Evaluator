from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview, name="api-overview"),
    path("problem-list/", views.problemList, name="problem-list"),
    path("problem-details/<str:pk>", views.problemDetail, name="problem-details"),
    path("problem-create/", views.problemCreate, name="problem-create"),
    path("problem-update/<str:pk>", views.problemUpdate, name="problem-update"),
    path("problem-delete/<str:pk>", views.problemDelete, name="problem-delete"),
    path("solution-list/<str:pk>", views.solutionList, name="solution-list")
]