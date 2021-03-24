from django.db import models
from django.db.models.fields import DateField

from django.utils import timezone


class Problem(models.Model):
    title = models.CharField(max_length=200)
    statement = models.CharField(max_length=200, null=True, blank=True)
    demand = models.CharField(max_length=200)
    input_data = models.CharField(max_length=200)
    output_data = models.CharField(max_length=200)
    restrictions = models.CharField(max_length=200, null=True, blank=True)
    example = models.CharField(max_length=200)
    pub_date = models.DateField("date published", auto_now_add=True)
    default_code = models.CharField(max_length=800, default="")

    def __str__(self):
        return self.demand


class Solution(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    test = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)

    def __str__(self):
        return self.test
