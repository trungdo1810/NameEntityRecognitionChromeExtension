FROM python:3.10

ENV PYTHONUNBUFFERED=1

WORKDIR /ner_app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . /ner_app

EXPOSE 8000

CMD ["python", "manage.py","runserver", "0.0.0.0:8000"]