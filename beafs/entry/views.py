from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
from .forms import SignUpForm, LogInForm
from .models import Profile
from django.contrib.auth import authenticate, login
from django.utils import timezone

def log_in(request):
    if request.method == "POST":
        form = LogInForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            if Profile.objects.filter(email=email).exists():
                prof = Profile.objects.get(email=email)
                if prof.password == password:
                    return HttpResponseRedirect(reverse('main:profile', args=(prof.pk,)))
    else:
        form = LogInForm()
    return render(request, 'entry/log_in.html', {'form': form})


def sign_up(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            email= request.POST.get('email')
            nickname = request.POST.get('nickname')
            password = request.POST.get('password')

            prof = Profile(email=email)
            prof.nickname=nickname
            prof.password=password
            prof.created_at=timezone.now().day
            prof.gender = ""
            prof.interests = ""
            prof.bio = ""
            prof.save()
            return redirect('log_in')
    else:
        form = SignUpForm()
    return render(request, 'entry/sign_up.html', {'form': form})
