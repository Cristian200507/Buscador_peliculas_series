from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, NumberFilter, CharFilter
from .models import Contenido
from .serializers import ContenidoSerializer, RegisterSerializer 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ContenidoFilter(FilterSet):
    tipo = CharFilter(field_name='tipo', lookup_expr='exact')
    anio = NumberFilter(field_name='anio', lookup_expr='exact')
    productora = CharFilter(field_name='productora', lookup_expr='icontains')
    director = CharFilter(field_name='director', lookup_expr='icontains')
    genero = CharFilter(method='filtrar_genero')

    class Meta:
        model = Contenido
        fields = ['tipo', 'anio', 'productora', 'director', 'genero']

    def filtrar_genero(self, queryset, name, value):
        if not value:
            return queryset

        value = value.lower()
        ids = [
            item.id for item in queryset
            if any(value in g.lower() for g in item.generos)
        ]

        return queryset.filter(id__in=ids)


class ContenidoViewSet(viewsets.ModelViewSet):
    queryset = Contenido.objects.all()
    serializer_class = ContenidoSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter
    ]

    filterset_class = ContenidoFilter

    search_fields = [
        'titulo',
        'sinopsis',
        'director',
        'productora'
    ]

    ordering_fields = ['anio', 'titulo', 'creado']


class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Usuario registrado correctamente"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
