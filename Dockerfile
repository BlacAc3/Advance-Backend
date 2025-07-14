# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (e.g., for psycopg2-binary if using PostgreSQL)
RUN apt-get update && apt-get install -y \
    postgresql-client \
    gcc \
    # Add any other necessary system packages here
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Collect static files (important for Django production)
# Make sure your settings.py has STATIC_ROOT configured
RUN python manage.py collectstatic --noinput

# Expose the port your application listens on
EXPOSE 8000

# Run the application using Gunicorn
# Adjust 'advance_backend.wsgi:application' to match your Django project's WSGI file
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "advance_backend.wsgi:application"]
