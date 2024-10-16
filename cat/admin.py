from django.contrib import admin
from django.utils.safestring import mark_safe

from cat.models import CatImage


class CatImageAdmin(admin.ModelAdmin):
    list_display = ('image', 'is_public')
    readonly_fields = ('image',)

    def image_thumbnail(self, obj):
        return mark_safe('<img src="%s" width="100" height="100" />' % (obj.image.url))

    image_thumbnail.short_description = 'Миниатюра'
    image_thumbnail.allow_tags = True


admin.site.register(CatImage, CatImageAdmin)
