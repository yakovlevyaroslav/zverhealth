from django import forms

from cat.models import CatImage


class CatImageForm(forms.ModelForm):
    class Meta:
        model = CatImage
        fields = ['original_image']

