# Generated by Django 4.2.1 on 2023-12-01 18:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0012_barcode_barcode_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='barcode',
            name='image',
        ),
        migrations.CreateModel(
            name='MyProduct',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('price', models.IntegerField(default=0)),
                ('product_code', models.ImageField(default='', upload_to=main.models.image_upload_path)),
                ('product_image', models.ImageField(upload_to=main.models.image_upload_path)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
