from django.db import models
from django.utils import timezone
from datetime import date
from django.utils.translation import gettext_lazy as _

class Song(models.Model):
    title = models.CharField(max_length=40)
    artist = models.CharField(default="unknown", max_length=40)
    album = models.CharField(default="", max_length=40, null=True, blank=True)
    year_song = models.SmallIntegerField(null=True, blank=True)
    lyrics = models.TextField(null=True, blank=True)
    cover = models.FileField(null=True)
    audio = models.FileField(null=True)
    pass

    class Meta:
        app_label = 'main'

    def __str__(self):
        return self.title


class Playlist(models.Model):
    playlist_name = models.CharField(default="music", max_length=40)
    profile_pk = models.ForeignKey('entry.Profile',on_delete=models.CASCADE,)
    cover = models.FileField(null=True)
    pass

    class Meta:
        app_label = 'main'
        constraints = [
            models.UniqueConstraint(fields=['playlist_name', 'profile_pk'], name='unique playlist'),
        ]

    def __str__(self):
        return self.playlist_name

class PlaylistSong(models.Model):
    playlist_pk = models.ForeignKey('Playlist',on_delete=models.CASCADE,)
    audio_pk = models.ForeignKey('Song',on_delete=models.CASCADE,)

    class Meta:
        app_label = 'main'
