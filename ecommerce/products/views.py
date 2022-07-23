from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Productos, Categorias
from .serializers import ProductosSerializer, CategoriasSerializer

# Create your views here.
class ProductosView(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

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

class CategoriasView(generics.ListCreateAPIView):
    queryset = Categorias.objects.filter(estado=True).all()
    serializer_class = CategoriasSerializer

    def get(self, request):
        categorias = self.get_serializer(self.get_queryset(), many=True)

        return Response(data={
            'success': True,
            'message': 'La lista de productos es',
            'content': categorias.data
        },status=status.HTTP_200_OK)
    
    def post(self, request):
        categoria = self.get_serializer(data=request.data)
        if categoria.is_valid():
            categoria.save()
            return Response(data={
                'success': True,
                'message': '',
                'content': categoria.data
            },status=status.HTTP_201_CREATED)