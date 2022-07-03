# Generated by Django 3.2.13 on 2022-06-30 21:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0034_commodity_hs_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tracking',
            name='shipment',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='shipment_tracker', to='manager.shipment'),
        ),
    ]
