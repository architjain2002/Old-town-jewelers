import time
from chatbot import *
from gold import *
from silver import *

import csv
import nltk
# import yfinance as yf

from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.triggers.cron import CronTrigger
from flask import Flask, jsonify, request


# importing libraries
from bs4 import BeautifulSoup as BS
import requests
from flask_cors import CORS


nltk.download('punkt')  # first-time use only
nltk.download('wordnet')  # first-time use only
nltk.download('popular', quiet=True)


app = Flask(__name__)
CORS(app)
# cron-job to run 12AM everyday -> not working
# cron_expression = '0 0 * * *'


def goldPrice():
    # getting the request from url
    url = "https://economictimes.indiatimes.com/markets/gold-rate-in-india-today"
    data = requests.get(url)

    # converting the text
    soup = BS(data.text, 'html.parser')

    # finding meta info for the current price
    ans = soup.find("span", class_="ltp").text
    ans = float(ans.replace(",", ""))
    # returning the price
    return ans


def silverPrice():

    url = "https://www.goodreturns.in/silver-rates/"
    data = requests.get(url)

    # converting the text
    soup = BS(data.text, 'html.parser')

    # finding meta info for the current price
    ans = soup.find(
        "div", id="current-price").find("strong", id="el").text
    ans = float(ans.strip()[1:]) * 1000
    # returning the price
    return ans


# writing in csv file
def writeInCSV():

    # data to be added
    data = [[gold, silver]]
    # print(data)
    # Path to the CSV file
    csv_file_path = 'Prices.csv'

    # Open the file in write mode
    with open(csv_file_path, 'a', newline='') as file:
        # Create a CSV writer object
        writer = csv.writer(file)

        # Write the data to the CSV file
        writer.writerows(data)

    # Close the CSV files
    file.close()


# removing -60'th day prices (outdata)
def deleteInCSV():

    # Path to the original CSV file
    original_csv_file_path = 'Prices.csv'

    # Path to the new CSV file without the second row
    new_csv_file_path = 'Prices.csv'

    # Read the original CSV file
    with open(original_csv_file_path, 'r', newline='') as file:
        reader = csv.reader(file)

        # Copy the header row to a new list
        header_row = next(reader)

        # Skip the second row
        next(reader)

        # Get the remaining rows
        rows = list(reader)

    # Write the rows (excluding the second row) to a new CSV file
    with open(new_csv_file_path, 'w', newline='') as file:
        writer = csv.writer(file)

        # Write the header row
        writer.writerow(header_row)

        # Write the remaining rows to the new CSV file
        writer.writerows(rows)

    # Close the CSV files
    file.close()


# invoke functions
# initialization of the gold and silver prices
gold = goldPrice()
silver = silverPrice()


writeInCSV()
deleteInCSV()

foreCastArray_gold = predictGold()
foreCastArray_silver = predictSilver()


def scheduler(foreCastArray_gold, foreCastArray_silver):
    gold = goldPrice()
    silver = silverPrice()

    arrayGold = predictGold()
    arraySilver = predictSilver()

    # both 15-lengths array
    for i in range(0, 15):
        foreCastArray_gold[i] = arrayGold[i]
        foreCastArray_silver[i] = arraySilver[i]


sched = BackgroundScheduler(daemon=True)
sched.add_job(scheduler, 'interval', args=[
              foreCastArray_gold, foreCastArray_silver], minutes=1440)
# sched.add_job(scheduler,CronTrigger.from_crontab(cron_expression),args=[foreCastArray_gold,foreCastArray_silver])
sched.start()


@app.route("/")
def hello():
    return "Hello from the Old-Town-Jewels"


@app.route('/chat', methods=['POST'])
def users():
    return jsonify({"Reply": RuleBot().chat(request.json['chat'])})


@app.route('/prices')
def prices():
    return jsonify({"Gold": str(foreCastArray_gold[7])}, {"Silver": str(foreCastArray_silver[7])})


@app.route('/priceChange')
def priceChange():
    return jsonify({"Gold": str(foreCastArray_gold[7]-foreCastArray_gold[6])}, {"Silver": str(foreCastArray_silver[7]-foreCastArray_silver[6])})


@app.route('/forecast')
def forecast():

    gold = [int(item) for item in foreCastArray_gold]
    silver = [int(item) for item in foreCastArray_silver]
    return {"Gold": gold, "Silver": silver}
