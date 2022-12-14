from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
import os

# create a new user

class MyAccountManager(BaseUserManager):

    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must have a username")
        
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def get_profile_image_filepath(self, filename):
    return f'profile_images/{self.pk}/{"profile_image.png"}'

def get_default_profile_image():
    return 'default_profile/profile.png'

class Account(AbstractBaseUser):
    email          = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username       = models.CharField(max_length=30, unique=True)
    address        = models.CharField(max_length=200)
    date_joined    = models.DateTimeField(verbose_name="Date Joined", auto_now_add=True)
    last_login     = models.DateTimeField(verbose_name="Last login", auto_now=True)
    is_admin       = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=True)
    is_staff       = models.BooleanField(default=False)
    is_superuser   = models.BooleanField(default=False)
    profile_image  = models.ImageField(max_length=255, upload_to=get_profile_image_filepath, null=True, blank=True, default=True)
    
    class Categories(models.TextChoices):
        STUDENT = 'STD', 'Student'
        TEACHER = 'TCH', 'Teacher'
        SCHOOL ='SCH', 'School'
        PARENT = 'PRT', 'Parent'

    user_category  = models.CharField(max_length=200, choices=Categories.choices, null=True)
    hide_email     = models.BooleanField(default=True)



    objects = MyAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
        
    def get_profile_image_filename(self):
        return str(self.profile_image)[str(self.profile_image).index(f'profile_images/{self.pk}/'):]

    def has_perm(self, perm, obj=None):
        return self.is_admin

    
    def has_module_perms(self, app_label):
        return True
    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     img = profile.open(self.image.path)

    #     if img.height > 300 or img.width > 300:
    #         ourtput_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)



