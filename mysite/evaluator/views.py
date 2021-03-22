from django import http
from django.http.response import Http404, HttpResponseRedirect
from .models import Problem, Solution
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.urls import reverse


def index(request):
    latest_problem_list = Problem.objects.order_by("-pub_date")[:5]
    context = {
        "latest_problem_list": latest_problem_list,
    }
    return render(request, "evaluator/index.html", context)


def detail(request, problem_id):
    problem = get_object_or_404(Problem, pk=problem_id)
    return render(request, "evaluator/detail.html", {"problem": problem})


def tests(request, problem_id):
    problem = get_object_or_404(Problem, pk=problem_id)
    return HttpResponse(f"You're looking at tests for problem {problem_id}.")


def answers(request, problem_id):
    return HttpResponse(f"You're looking at answers for problem {problem_id}.")


def submit(request, problem_id):
    # TODO: Fix POST
    problem = get_object_or_404(Problem, pk=problem_id)
    try:
        print(request.POST.getlist[answers])
        correct_answers = problem.solution_set.all()  # TODO: count(), [index]
    except (KeyError, Solution.DoesNotExist):
        return render(
            request,
            "evaluator/detail.html",
            {"problem": problem, "errormessage": "The problem does not have answers."},
        )
    else:
        print(correct_answers[1].answer)
        print(request.POST["user-code"])
        return HttpResponseRedirect(reverse("evaluator:detail", args=(problem.id,)))
