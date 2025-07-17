from rest_framework import generics, status
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

class ItemListCreateView(generics.ListCreateAPIView):
    # The GET /api/items/ and POST /api/items/ requests handled here
    # ListCreateAPIView handles allows for GET (list) and POST (create) requests
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetailView(generics.RetrieveUpdateAPIView):
    # GET /api/items/{id}/ and PATCH /api/items/{id}/ requests handled here 
    # generics.RetrieveUpdateAPIView handles retrieving and updating a model instance
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        # Allow update if name or group changes but maintain uniqueness
        if serializer.is_valid():
            new_name = serializer.validated_data.get('name', instance.name)
            new_group = serializer.validated_data.get('group', instance.group)
            if Item.objects.exclude(pk=instance.pk).filter(name=new_name, group=new_group).exists():
                return Response({'error': 'Item with this name already exists in this group.'}, status=400)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


