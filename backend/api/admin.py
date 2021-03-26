from django.contrib import admin
from django.forms.models import fields_for_model
from .models import Problem, Solution
from django import forms

# admin.site.register(Problem)
# admin.site.register(Solution)


class ProblemModelForm(forms.ModelForm):
    statement = forms.CharField(widget=forms.Textarea(attrs={"rows": 4, "cols": 100}))
    demand = forms.CharField(widget=forms.Textarea(attrs={"rows": 4, "cols": 100}))
    input_data = forms.CharField(widget=forms.Textarea(attrs={"rows": 4, "cols": 100}))
    output_data = forms.CharField(widget=forms.Textarea(attrs={"rows": 4, "cols": 100}))
    restrictions = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 4, "cols": 100})
    )
    example = forms.CharField(widget=forms.Textarea(attrs={"rows": 4, "cols": 100}))
    default_code = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 20, "cols": 100})
    )

    class Meta:
        model = Problem
        fields = "__all__"


class SolutionModelForm(forms.ModelForm):
    test = forms.CharField(widget=forms.Textarea(attrs={"rows": 6, "cols": 50}))
    answer = forms.CharField(widget=forms.Textarea(attrs={"rows": 6, "cols": 50}))

    class Meta:
        model = Solution
        fields = "__all__"


class InLineSolution(admin.TabularInline):
    model = Solution
    form = SolutionModelForm
    extra = 1


class ProblemAdmin(admin.ModelAdmin):
    form = ProblemModelForm
    inlines = [InLineSolution]


class SolutionAdmin(admin.ModelAdmin):
    form = SolutionModelForm


admin.site.register(Problem, ProblemAdmin)
admin.site.register(Solution, SolutionAdmin)
