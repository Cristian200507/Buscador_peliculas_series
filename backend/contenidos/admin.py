from django.contrib import admin
from .models import Contenido

@admin.register(Contenido)
class ContenidoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'anio', 'director', 'productora', 'capitulos')
    list_filter = ('tipo', 'anio', 'productora')
    search_fields = ('titulo', 'director', 'productora', 'generos')
