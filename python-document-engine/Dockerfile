FROM python:3.13-slim

WORKDIR /app

COPY pyproject.toml .

RUN pip install --no-cache-dir "hatchling>=1.20" && \
    pip install --no-cache-dir .

COPY app.py .

EXPOSE 8000

ENV PORT=8000
ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
