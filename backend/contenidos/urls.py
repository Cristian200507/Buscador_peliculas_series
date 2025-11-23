from rest_framework import routers
from .views import ContenidoViewSet

router = routers.DefaultRouter()
router.register(r'contenidos', ContenidoViewSet, basename='contenido')

urlpatterns = router.urls
