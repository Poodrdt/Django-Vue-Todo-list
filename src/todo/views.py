from django.views.generic import ListView

from .models import Task
from rest_framework import viewsets
from .serializers import TaskSerializer


class TaskListView(ListView):
    model = Task
    template_name = 'todo.html'
    context_object_name = 'tasks'


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows jobs to be viewed or edited.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
