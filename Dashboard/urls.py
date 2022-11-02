from django.urls import path
from .views import ExploreView, SettingsView


urlpatterns = [
    path('explore', ExploreView.as_view(), name="explore"),
    path('settings', SettingsView.as_view(), name="settings"),
]
