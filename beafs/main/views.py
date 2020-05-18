from django.shortcuts import render, get_object_or_404, redirect
from entry.models import Profile
from main.models import Playlist, Song, PlaylistSong
from .forms import ChangePsw
from django.db.models import Count

def story(request, pk):
    prof = get_object_or_404(Profile, pk=pk)
    return render(request, 'story/content.html', {'prof': prof})

def music(request, pk):
    prof = get_object_or_404(Profile, pk=pk)
    audios = Song.objects.all()
    playlists = Playlist.objects.all().filter(profile_pk = pk)
    fav = playlists.filter(playlist_name="favorite")
    context = {'prof': prof, 'fav':fav, 'music': audios}

    return render(request, 'music/content.html', context)

def profile(request, pk):
    # does profile exist? if yes, then create prof, else redirect to page 404
    prof = get_object_or_404(Profile, pk=pk)
    # create empty form
    empty_form = ChangePsw()
    # playlists of current profile
    playlists = Playlist.objects.all().filter(profile_pk=pk)

    #build context
    context = {'prof': prof, 'playlists':playlists, 'form': empty_form, 'error_message': "",}

    #if form sends data
    if request.method == "POST":
        form = ChangePsw(request.POST)
        if form.is_valid():
            #checks error: wrong password
            if prof.password != form.cleaned_data['old_psw']:
                context['error_message'] = "wrong password"
                return render(request, 'profile/content.html', context)

            #checks error: new password mismatch
            if form.cleaned_data['new_psw'] != form.cleaned_data['conf_psw']:
                context['error_message'] = "new password mismatches"
                return render(request, 'profile/content.html', context)

            #no errors
            context['error_message'] = "success"
            prof.password = form.cleaned_data['new_psw']
            prof.save()
            return render(request, 'profile/content.html', context)

    return render(request, 'profile/content.html', context)

def playlist(request, pk, pl):
    return render(request, 'profile/content.html')
