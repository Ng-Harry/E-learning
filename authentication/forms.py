from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate
from .models import Account

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=250, help_text="Required. Please enter a valid email address.")

    class Meta:
        model = Account
        fields = ('email', 'username', 'password1', 'password2', 'user_category', 'address')
        # is_active=False
        def clean_email(self):
            email = self.clean_data['email'].lower()
            try:
                account = Account.objects.get(email=email)
            except Exception as e:
                return email
            raise forms.ValidationError(f"Email {email} is already in use.")
        
        def clean_username(self):
            username = self.clean_data['username']
            try:
                account = Account.objects.get(username=username)
            except Exception as e:
                return username
            raise forms.ValidationError(f"username {username} is already in use.")
        
        def clean_address(self):
            address = self.clean_data['address']
            try:
                account = Account.objects.get(address=address)
            except Exception as e:
                pass
            raise forms.ValidationError(f"Please enter a valid address")


class AccountAuthenticationForm(forms.ModelForm):

	password = forms.CharField(label='Password', widget=forms.PasswordInput)

	class Meta:
		model = Account
		fields = ('email', 'password')

	def clean(self):
		if self.is_valid():
			email = self.cleaned_data['email']
			password = self.cleaned_data['password']
			if not authenticate(email=email, password=password):
				raise forms.ValidationError("Invalid login")