from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

    def validate(self, data):
        if Item.objects.filter(name=data['name'], group=data['group']).exists():
            raise serializers.ValidationError("Item with this name already exists in this group.")
        return data