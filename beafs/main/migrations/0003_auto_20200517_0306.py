# Generated by Django 3.0.5 on 2020-05-17 03:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20200517_0211'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlaylistSong',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RemoveField(
            model_name='playlist',
            name='audio_pk',
        ),
        migrations.AddConstraint(
            model_name='playlist',
            constraint=models.UniqueConstraint(fields=('playlist_name', 'profile_pk'), name='unique playlist'),
        ),
        migrations.AddField(
            model_name='playlistsong',
            name='audio_pk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Song'),
        ),
        migrations.AddField(
            model_name='playlistsong',
            name='playlist_pk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Playlist'),
        ),
    ]