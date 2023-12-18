from django.shortcuts import render

# Create your views here.

from django.views.decorators.csrf import csrf_exempt
import json
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####
from django.core.cache import cache 

from transformers import AutoModelForTokenClassification, AutoTokenizer, pipeline

def index(request):
    return HttpResponse("Hello, world. You're at the NER Extension index.")


def receive_text(request):
    topic = request.GET.get('topic', None)
    print("----------------------------")


    phobert = AutoModelForTokenClassification.from_pretrained("rain1024/underthesea_vlsp2016_ner")
    tokenizer = AutoTokenizer.from_pretrained("rain1024/underthesea_vlsp2016_ner")


    nlp = pipeline("ner", model=phobert, tokenizer=tokenizer)
    ner_results = nlp(topic)

    print(ner_results)

    per_entities = []
    org_entities = []

    for i in range(len(ner_results)):
        if ner_results[i]['entity'] in ('B-PER', 'I-PER'):
            if '#' in ner_results[i]['word']:
                per_entities[-1] = per_entities[-1] + ner_results[i]['word'].split('#')[-1]
            elif (i >= 1) and (ner_results[i]['index'] == ner_results[i-1]['index'] + 1):
                per_entities[-1] = per_entities[-1] + ' ' + ner_results[i]['word']                
            else:
                per_entities.append(ner_results[i]['word'])
        
        if ner_results[i]['entity'] in ('B-ORG', 'I-ORG'):
            if '#' in ner_results[i]['word']:
                org_entities[-1] = org_entities[-1] + ner_results[i]['word'].split('#')[-1]
            elif (i >= 1) and (ner_results[i]['index'] == ner_results[i-1]['index'] + 1):
                org_entities[-1] = org_entities[-1] + ' ' + ner_results[i]['word']      
            else:
                org_entities.append(ner_results[i]['word'])



    # per_entities = [entity['word'].replace('#', '') for entity in ner_results if entity['entity'] in ('B-PER', 'I-PER')]
    # org_entities = [entity['word'].replace('#', '') for entity in ner_results if entity['entity'] in ('B-ORG', 'I-ORG')]

    print(per_entities)
    print(org_entities)


    data = {
        'per_words': per_entities,
        'org_words': org_entities,
        'raw': 'Successful'
    }

    print('json-data to be sent: ', data)

    return JsonResponse(data)