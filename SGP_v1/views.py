# coding=utf-8
import json
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login
from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response
from SGP_v1.models import Usuario
from SGP_v1.permisos import IsAccountOwner
from SGP_v1.serializers import UsuarioSerializer

# Create your views here.

class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class UsuarioViewSet(viewsets.ModelViewSet):
    '''
    Conjunto de vistas que maneja el ABM de usuarios.
    '''
    lookup_field = 'username'
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        #Todos tienen permiso de crear su propia cuenta
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        #Solo el dueño de una cuenta puede hacer update() o delete()
        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Usuario.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)



class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        username = data.get('username', None)
        password = data.get('password', None)

        account = authenticate(email=username, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = UsuarioSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'Esta cuenta de usuario ha sido deshabilitada'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Nombre de usuario o contraseña inválidos.'
            }, status=status.HTTP_401_UNAUTHORIZED)
