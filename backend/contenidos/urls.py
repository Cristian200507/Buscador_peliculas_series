from rest_framework import routers
from django.urls import path
from .views import ContenidoViewSet, RegisterView

router = routers.DefaultRouter()
router.register(r'contenidos', ContenidoViewSet, basename='contenido')

urlpatterns = [
    *router.urls,
    path('register/', RegisterView.as_view(), name='register'),
]
