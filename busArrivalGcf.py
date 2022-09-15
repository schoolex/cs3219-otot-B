import json
from time import timezone
from requests import request as req
from datetime import datetime, timedelta, timezone
import os
import functions_framework
from flask import escape



BUS_ARRIVAL_URL = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2"
ACCOUNT_KEY = os.environ["ACCOUNT_KEY"]

@functions_framework.http
def processReq(request):

    request_json = request.get_json(silent=True)
    request_args = request.args

    if not request_args or not 'busStopCode' in request_args or not 'serviceNo' in request_args:
        return 'Invalid Request'
    return getArrivalTimings(request_args['busStopCode'], request_args['serviceNo'])


def getArrivalTimings(busStopCode: str, serviceNo: str) -> list:
    headers = {
    'AccountKey': ACCOUNT_KEY,
    'Accept': 'application/json'
    }
    try:
        response = req("GET", f'{BUS_ARRIVAL_URL}?BusStopCode={busStopCode}', headers=headers)
        response = response.json()
        service = list(filter(lambda x: x['ServiceNo'] == str(serviceNo), response['Services']))
        if not service:
            raise Exception("Service not found")
        currentTime = datetime.now(timezone(timedelta(hours=8)))
        currentTime = currentTime.replace(tzinfo=None)
        nextBus = datetime.strptime(service[0]['NextBus']['EstimatedArrival'], '%Y-%m-%dT%H:%M:%S+08:00') - currentTime
        nextBus2 = datetime.strptime(service[0]['NextBus2']['EstimatedArrival'], '%Y-%m-%dT%H:%M:%S+08:00') - currentTime
        nextBus3 = datetime.strptime(service[0]['NextBus3']['EstimatedArrival'], '%Y-%m-%dT%H:%M:%S+08:00') - currentTime
        res = {
            'nextBus': min(nextBus.seconds//60,60),
            'nextBus2': min(nextBus2.seconds//60,60),
            'nextBus3': min(nextBus3.seconds//60,60)
        }
        # Set CORS headers for the main request
        headers = {
        'Access-Control-Allow-Origin': '*'
        }
        return (res,200,headers)
    except Exception as e:
        print(e)
        return e
    