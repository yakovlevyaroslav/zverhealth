# Generated by Django 5.1.2 on 2024-10-16 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0003_delete_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catimage',
            name='image',
            field=models.ImageField(upload_to='media'),
        ),
    ]
