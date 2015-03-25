from django.db import models

# Create your models here.

"""El manager del Account, que es necesario para instanciarlo (cosas de django)"""
from django.contrib.auth.models import BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError('Users must have a valid username.')

        if not kwargs.get('email'):
            raise ValueError('Users must have a valid email address.')

        account = self.model(
            username=username, email=self.normalize_email(kwargs.get('email'))
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, username, password, **kwargs):
        account = self.create_user(username, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


"""La clase account sera la clase de nuestras cuentas"""
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)
    """ blank = true significa que hace opcional al atributo, ojo con eso"""
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)

    is_scrumMaster = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    """USERNAME_FIELD = 'email' establece a email como campo utilizado para la autenticacion"""
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    """ REQUIRED_FIELDS = ['username'] """

    def __unicode__(self):
        return self.username

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

""" una vez terminado se debe ejecutar python manage.py createsuperuser para crear un super user """
""" para confirmar que se haya creado, ejecutar en la terminal python manage.py shell
 y en el shell:
 from SGP_v1.models import Account
 a = Account.objects.latest('created_at')

 a
 a.email
 a.username

 """


