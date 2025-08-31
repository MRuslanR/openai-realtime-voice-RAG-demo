FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код
COPY . .

# Создаем директории для данных
RUN mkdir -p chroma_db logs

# Устанавливаем переменные окружения
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:3000", "--timeout", "120", "server:app"]