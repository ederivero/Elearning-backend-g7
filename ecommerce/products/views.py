from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Productos
from .serializers import ProductoSerializer

# Create your views here.
class ProductoView(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer

    def get(self, request):
        productos = self.get_serializer(self.get_queryset(), many=True)
        
        return Response(data={
            'success': True,
            'message': 'La lista de productos es',
            'content': productos.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        producto = self.get_serializer(data=request.data)
        if producto.is_valid():
            producto.save()
            return Response(data={
                'success': True,
                'message': '',
                'content': producto.data
            }, status=status.HTTP_201_CREATED)