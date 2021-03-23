from django.contrib import admin
from .models import Problem, Solution
from django import forms

# admin.site.register(Problem)
# admin.site.register(Solution)


class ProblemModelForm(forms.ModelForm):
    default_code = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Problem
        fields = "__all__"


class InLineSolution(admin.TabularInline):
    model = Solution


class ProblemAdmin(admin.ModelAdmin):
    form = ProblemModelForm
    inlines = [InLineSolution]


admin.site.register(Problem, ProblemAdmin)
admin.site.register(Solution)
