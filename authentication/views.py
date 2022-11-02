from platform import platform
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import RegistrationForm, AccountAuthenticationForm
from .models import Account
import threading
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth.models import User
from django.utils.html import strip_tags
import uuid
from .utils import generate_token
from django.views.generic import View
from validate_email import validate_email
from django.contrib import auth


class EmailThread(threading.Thread):

    def __init__(self, email_message):
        self.email_message = email_message
        threading.Thread.__init__(self)

    def run(self):
        self.email_message.send()


def Registration_View(request, *args, **kwargs):
    context = {}

    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            current_site = get_current_site(request)
            email_subject = '[Email Verification]'

            template = loader.get_template('auth/activate.txt')

            parameters = {  'user': user,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': generate_token.make_token(user)
                    }


            email_pati = template.render(parameters)

            email_message = EmailMultiAlternatives(
                email_subject,
                email_pati,
                settings.EMAIL_HOST_USER,
                [email]
            )
            email_message.content_subtype = 'html'
            EmailThread(email_message).start()
            return redirect('verify_notice')

        else:
            context['registration_form'] = form

    return render(request, 'auth/signup.html', context)


def login_view(request, *args, **kwargs):
    context = {}

    if request.POST:
        form = AccountAuthenticationForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email, password=password)

            if user:
                login(request, user)
                return redirect("home")

    else:
        form = AccountAuthenticationForm()

    context['login_form'] = form

    return render(request, "auth/login.html", context)


def VerifyNotice_View(request):
    return render(request, 'auth/email_verification.html')
