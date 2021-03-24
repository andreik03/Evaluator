from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse, response
from .models import Problem, Solution
from .serializers import ProblemSerializer, SolutionSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def apiOverview(request):
    api_urls = {
        "List problems": "/problem/list/",
        "View problem": "/problem/details/<str:pk>/",
        "Create problem": "/problem/create/",
        "Update problem": "/problem/update/<str:pk>/",
        "Delete problem": "/problem/delete/<str:pk>/",
        "List solutions": "/solution/list/<str:pk>/",
    }

    return Response(api_urls)


@api_view(["GET"])
def problemList(request):
    problems = Problem.objects.all()
    serializer = ProblemSerializer(problems, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def problemDetail(request, pk):
    problem = get_object_or_404(Problem, id=pk)
    serializer = ProblemSerializer(problem, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def problemCreate(request):
    serializer = ProblemSerializer(data=request.data)
    print(serializer)
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["POST"])
def problemUpdate(request, pk):
    problem = get_object_or_404(Problem, id=pk)
    serializer = ProblemSerializer(instance=problem, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["DELETE"])
def problemDelete(request, pk):
    problem = get_object_or_404(Problem, id=pk)
    problem.delete()
    return Response("Problem succsesfully deleted.")


@api_view(["GET"])
def solutionList(request, pk):
    problem = get_object_or_404(Problem, id=pk)
    solutions = problem.solution_set.all()
    serializer = SolutionSerializer(solutions, many=True)
    return Response(serializer.data)