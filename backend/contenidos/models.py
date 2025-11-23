from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
import datetime

class Contenido(models.Model):
    class TipoChoices(models.TextChoices):
        PELICULA = 'pelicula', _('Película')
        SERIE = 'serie', _('Serie')

    titulo = models.CharField('título', max_length=250)
    sinopsis = models.TextField('sinopsis', blank=True)
    director = models.CharField('director', max_length=200, blank=True)
    anio = models.PositiveIntegerField(
        'año',
        validators=[MinValueValidator(1888), MaxValueValidator(datetime.date.today().year + 1)]
    )
    # generos como lista de strings en JSONField (permite múltiples)
    generos = models.JSONField('géneros', default=list, blank=True)
    productora = models.CharField('productora', max_length=200, blank=True)
    imagen_portada = models.ImageField('imagen de portada', upload_to='portadas/', blank=True, null=True)
    tipo = models.CharField('tipo', max_length=10, choices=TipoChoices.choices, default=TipoChoices.PELICULA)
    capitulos = models.PositiveIntegerField('capítulos', blank=True, null=True,
                                            help_text='Número de capítulos (solo para series)')

    creado = models.DateTimeField('creado', auto_now_add=True)
    actualizado = models.DateTimeField('actualizado', auto_now=True)

    class Meta:
        verbose_name = 'contenido'
        verbose_name_plural = 'contenidos'
        ordering = ['-anio', 'titulo']

    def __str__(self):
        return f"{self.titulo} ({'Serie' if self.tipo=='serie' else 'Película'})"
