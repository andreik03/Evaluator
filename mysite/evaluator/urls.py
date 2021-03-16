from django.urls import path

from . import views

app_name = "evaluator"
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:problem_id>/", views.detail, name="detail"),
    path("<int:problem_id>/tests/", views.tests, name="tests"),
    path("<int:problem_id>/answers/", views.answers, name="answers"),
    path("<int:problem_id>/submit/", views.submit, name="submit"),
]