from django.contrib import admin

from main.models import Song, Playlist, PlaylistSong

admin.site.register(Song)
admin.site.register(Playlist)
admin.site.register(PlaylistSong)
