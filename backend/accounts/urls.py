# from .views import LoginAPI, RegisterAPI
# from knox import views as knox_views
from .views import BlacklistTokenUpdateView, CustomUserCreate
from django.urls import path


urlpatterns = [
    path("register/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
]