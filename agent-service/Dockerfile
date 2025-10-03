FROM python:3.10-slim

# Set the working directory
WORKDIR /app
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

# Run the application
CMD ["python", "app.py"]