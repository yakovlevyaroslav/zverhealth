from django.db import models


class CatImage(models.Model):
    image = models.ImageField(upload_to='cat_images')
    is_public = models.BooleanField(default=False)
