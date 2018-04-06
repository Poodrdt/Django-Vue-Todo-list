from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from todo.views import TaskListView, TaskViewSet


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet, base_name='tasks')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', TaskListView.as_view()),
    url(r'^api/', include(router.urls), name='api'),
]
