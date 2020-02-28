# Generated by Django 2.2.10 on 2020-02-28 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logs', '0002_log_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='grams',
            field=models.DecimalField(decimal_places=2, default=60, max_digits=8),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='food',
            name='measure',
            field=models.DecimalField(decimal_places=2, default=0.5, max_digits=8),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='food',
            name='unit',
            field=models.CharField(default='piece', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='food',
            name='calories',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='food',
            name='carbs',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='food',
            name='fat',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='food',
            name='fiber',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='food',
            name='protein',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='food',
            name='sat_fat',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
    ]