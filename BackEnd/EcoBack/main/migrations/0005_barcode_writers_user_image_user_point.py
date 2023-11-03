# Generated by Django 4.2.1 on 2023-10-30 15:12

from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_barcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='barcode',
            name='writers',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.user'),
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(default='', upload_to=main.models.image_upload_path),
        ),
        migrations.AddField(
            model_name='user',
            name='point',
            field=models.IntegerField(default=0),
        ),
    ]