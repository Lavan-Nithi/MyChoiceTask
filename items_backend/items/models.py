from django.db import models

# Create your models here.
class Item(models.Model):
    GROUP_CHOICES = (
        ('Primary', 'Primary'),
        ('Secondary', 'Secondary'),
    )
    name = models.CharField(max_length=200)
    group = models.CharField(max_length=50, choices=GROUP_CHOICES)
    # auto_now_add is for time for when instance is updated 
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now is for time for when instance is first created
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('name', 'group')

    def __str__(self):
        return f"{self.name} ({self.group})"


