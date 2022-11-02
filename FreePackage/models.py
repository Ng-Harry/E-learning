from unicodedata import category
from django.db import models


class Category(models.Model):
    file_type = models.CharField(max_length=200, verbose_name='Category type')
    description = models.TextField()

    class Meta:
        verbose_name_plural = "File Categories"

    def __str__(self):
        return self.file_type


# Subjects
class Subject(models.Model):
    subject_name = models.CharField(max_length=200, verbose_name="Name of Subject")
    
    class Meta:
        verbose_name_plural = "Subjects"

# 
class Freepackage(models.Model):
    name = models.CharField(max_length=200)
    category_type = models.ForeignKey('Category', on_delete=models.CASCADE, null=True, verbose_name='File category')
    cover_photo = models.ImageField(upload_to='file/cover_photos', verbose_name='File cover photo')
    description = models.TextField()
    document = models.FileField(upload_to='Files/main_files')

    class Meta:
        verbose_name_plural = 'Free Packages'

    def __str__(self):
        return self.name
