from rest_framework import serializers
from .models import Contenido

class ContenidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contenido
        fields = [
            'id', 'titulo', 'sinopsis', 'director', 'anio', 'generos',
            'productora', 'imagen_portada', 'tipo', 'capitulos', 'creado', 'actualizado'
        ]
        read_only_fields = ['creado', 'actualizado']

    def validate(self, data):
        tipo = data.get('tipo', getattr(self.instance, 'tipo', None))
        capitulos = data.get('capitulos', getattr(self.instance, 'capitulos', None))

        if tipo == Contenido.TipoChoices.SERIE:
            # para series, capitulos debe estar presente y ser positivo
            if capitulos is None:
                raise serializers.ValidationError({'capitulos': 'Para una serie debe indicarse la cantidad de capítulos.'})
            if capitulos <= 0:
                raise serializers.ValidationError({'capitulos': 'Los capítulos deben ser un número positivo.'})
        else:
            # para películas, no permitir capitulos relleno (lo guardamos como None)
            data['capitulos'] = None

        # generos: aceptar string o lista. Normalizar a lista.
        generos = data.get('generos', getattr(self.instance, 'generos', []))
        if isinstance(generos, str):
            # si el cliente envía "Acción,Comedia" -> convertir a lista
            generos = [g.strip() for g in generos.split(',') if g.strip()]
            data['generos'] = generos
        elif generos is None:
            data['generos'] = []
        return data
