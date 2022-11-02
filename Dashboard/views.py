from django.shortcuts import render
from django.shortcuts import render, redirect
from django.views.generic import View
from authentication.models import Account

# Explore view
class ExploreView(View):
    def get(self, request):
        return render(request, 'dashboard/explore.html')

# Settings view
class SettingsView(View):
    def get(self, request):
        user = request.user.id
        account = Account.objects.get(pk=user)
        context ={
            'account': account,
        }
        return render(request, 'dashboard/settings.html', context)

