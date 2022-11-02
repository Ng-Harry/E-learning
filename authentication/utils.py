from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, account, timestamp):
        return (six.text_type(account.pk)+six.text_type(timestamp)+six.text_type(account.is_active))


generate_token = TokenGenerator()

