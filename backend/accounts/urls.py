# from .views import LoginAPI, RegisterAPI
# from knox import views as knox_views
from .views import CustomUserCreate
from django.urls import path


urlpatterns = [
    # path("register/", RegisterAPI.as_view(), name="register"),
    # path('login/', LoginAPI.as_view(), name='login'),
    # path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path("register/", CustomUserCreate.as_view(), name="create_user"),
]