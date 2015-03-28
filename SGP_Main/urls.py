from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from SGP_v1.views import UsuarioViewSet, IndexView, LoginView

router = routers.SimpleRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
