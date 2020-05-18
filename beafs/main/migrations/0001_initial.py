# Generated by Django 3.0.5 on 2020-05-17 01:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('entry', '0002_auto_20200517_0127'),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('artist', models.CharField(default='unknown', max_length=40)),
                ('album', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('year_song', models.DateField(blank=True, default='', null=True)),
                ('lyrics', models.TextField(blank=True, null=True)),
                ('cover', models.FilePathField(default='default3.jpg', path='/Users/anastasya/Desktop/beafsy/beafs/db/cover', recursive=True)),
                ('audio', models.FilePathField(path='/Users/anastasya/Desktop/beafsy/beafs/db/audio', recursive=True)),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('playlist_name', models.CharField(default='music', max_length=40)),
                ('cover', models.FilePathField(default='music.jpg', path='/Users/anastasya/Desktop/beafsy/beafs/db/cover', recursive=True)),
                ('audio_pk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Song')),
                ('profile_pk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entry.Profile')),
            ],
        ),
        migrations.AddConstraint(
            model_name='playlist',
            constraint=models.UniqueConstraint(fields=('profile_pk', 'playlist_name'), name='unique playlist'),
        ),
    ]
