# Generated by Django 3.0.5 on 2020-05-17 05:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20200517_0306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='cover',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='song',
            name='audio',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='song',
            name='cover',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='song',
            name='year_song',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
    ]
