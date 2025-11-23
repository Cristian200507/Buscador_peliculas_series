from rest_framework import serializers
from .models import Contenido
from django.contrib.auth.models import User 


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
            if capitulos is None:
                raise serializers.ValidationError({'capitulos': 'Para una serie debe indicarse la cantidad de capítulos.'})
            if capitulos <= 0:
                raise serializers.ValidationError({'capitulos': 'Los capítulos deben ser un número positivo.'})
        else:
            data['capitulos'] = None

        generos = data.get('generos', getattr(self.instance, 'generos', []))
        if isinstance(generos, str):
            generos = [g.strip() for g in generos.split(',') if g.strip()]
            data['generos'] = generos
        elif generos is None:
            data['generos'] = []
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
