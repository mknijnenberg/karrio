# Generated by Django 3.2.13 on 2022-06-30 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0033_auto_20220504_1335'),
    ]

    operations = [
        migrations.AddField(
            model_name='commodity',
            name='hs_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
