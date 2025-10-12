# Use Python 3.9 slim image as base
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Expose port 8008
EXPOSE 8008

# Create a non-root user for security
RUN useradd -m -u 1000 kiosk && chown -R kiosk:kiosk /app
USER kiosk

# Start the HTTP server
CMD ["python", "-m", "http.server", "8008", "--bind", "0.0.0.0"]



