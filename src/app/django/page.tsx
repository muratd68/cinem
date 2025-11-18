'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Server, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function DjangoCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-600">
              <Server className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Django Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Python web framework</p>
            </div>
          </div>
          <PDFDownload title="Django" sheetId="django" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Proje Komutlari</h2>

          <CodeBlock
            language="bash"
            title="Django CLI"
            code={`# Proje olustur
django-admin startproject myproject

# App olustur
python manage.py startapp myapp

# Server calistir
python manage.py runserver
python manage.py runserver 8080

# Migration
python manage.py makemigrations
python manage.py migrate

# Superuser olustur
python manage.py createsuperuser

# Shell
python manage.py shell

# Test
python manage.py test`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Models</h2>

          <CodeBlock
            title="Model Tanimlama"
            code={`from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Book(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    published_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Books'`}
          />

          <CodeBlock
            title="QuerySet"
            code={`# Tum kayitlar
Book.objects.all()

# Filtreleme
Book.objects.filter(status='published')
Book.objects.filter(price__gte=100)
Book.objects.filter(title__icontains='python')
Book.objects.filter(author__name='Ali')

# Exclude
Book.objects.exclude(status='draft')

# Get (tek kayit)
Book.objects.get(id=1)

# First/Last
Book.objects.first()
Book.objects.last()

# Order
Book.objects.order_by('title')
Book.objects.order_by('-price')

# Limit
Book.objects.all()[:5]

# Count
Book.objects.count()

# Exists
Book.objects.filter(status='published').exists()

# Values
Book.objects.values('title', 'price')
Book.objects.values_list('title', flat=True)

# Aggregate
from django.db.models import Avg, Sum, Count
Book.objects.aggregate(Avg('price'))
Book.objects.aggregate(total=Sum('price'))

# Annotate
Author.objects.annotate(book_count=Count('book'))

# Create
book = Book.objects.create(title='New Book', price=50)

# Update
Book.objects.filter(id=1).update(price=75)

# Delete
Book.objects.filter(id=1).delete()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Views</h2>

          <CodeBlock
            title="Function-Based Views"
            code={`from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Book

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books/list.html', {'books': books})

def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    return render(request, 'books/detail.html', {'book': book})

def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('book_list')
    else:
        form = BookForm()
    return render(request, 'books/form.html', {'form': form})

def api_books(request):
    books = list(Book.objects.values())
    return JsonResponse(books, safe=False)`}
          />

          <CodeBlock
            title="Class-Based Views"
            code={`from django.views.generic import (
    ListView, DetailView, CreateView, UpdateView, DeleteView
)
from django.urls import reverse_lazy

class BookListView(ListView):
    model = Book
    template_name = 'books/list.html'
    context_object_name = 'books'
    paginate_by = 10

class BookDetailView(DetailView):
    model = Book
    template_name = 'books/detail.html'

class BookCreateView(CreateView):
    model = Book
    fields = ['title', 'author', 'price']
    success_url = reverse_lazy('book_list')

class BookUpdateView(UpdateView):
    model = Book
    fields = ['title', 'price']
    success_url = reverse_lazy('book_list')

class BookDeleteView(DeleteView):
    model = Book
    success_url = reverse_lazy('book_list')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">URLs</h2>

          <CodeBlock
            title="URL Patterns"
            code={`# urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('books/', views.book_list, name='book_list'),
    path('books/<int:pk>/', views.book_detail, name='book_detail'),
    path('books/create/', views.book_create, name='book_create'),

    # Include
    path('api/', include('api.urls')),

    # CBV
    path('books/', BookListView.as_view(), name='book_list'),
]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Forms</h2>

          <CodeBlock
            title="Django Forms"
            code={`from django import forms
from .models import Book

# Model Form
class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'price']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
        }

# Regular Form
class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)

    def clean_email(self):
        email = self.cleaned_data['email']
        if not email.endswith('.com'):
            raise forms.ValidationError('Invalid email')
        return email`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Templates</h2>

          <CodeBlock
            language="html"
            title="Template Syntax"
            code={`<!-- base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- list.html -->
{% extends 'base.html' %}

{% block content %}
    <h1>Books</h1>

    {% for book in books %}
        <div>
            <h2>{{ book.title }}</h2>
            <p>{{ book.price|floatformat:2 }}</p>
            <a href="{% url 'book_detail' book.pk %}">Detail</a>
        </div>
    {% empty %}
        <p>No books found.</p>
    {% endfor %}

    {% if is_paginated %}
        {% for page in paginator.page_range %}
            <a href="?page={{ page }}">{{ page }}</a>
        {% endfor %}
    {% endif %}
{% endblock %}`}
          />
        </section>
      </div>
    </div>
  )
}
