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


nltk.download('punkt')  # first-time use only
nltk.download('wordnet')  # first-time use only
nltk.download('popular', quiet=True)


app = Flask(__name__)

# cron-job to run 12AM everyday -> not working
# cron_expression = '0 0 * * *'

# both 15-lengths array
foreCastArray_gold = predictGold()
foreCastArray_silver = predictSilver()


def scheduler(foreCastArray_gold, foreCastArray_silver):

    # working of rapid api
    def goldPrice():
        # getting the request from url
        url = "https://economictimes.indiatimes.com/markets/gold-rate-in-india-today"
        data = requests.get(url)

        # converting the text
        soup = BS(data.text, 'html.parser')

        # finding meta info for the current price
        ans = soup.find("span", class_="ltp").text
        ans = int(ans.replace(",", ""))
        # returning the price
        return ans

    def silverPrice():

        url = "https://www.goodreturns.in/silver-rates/"
        data = requests.get(url)

        # converting the text
        soup = BS(data.text, 'html.parser')

        # finding meta info for the current price
        ans = soup.find("div", id="current-price").find("strong", id="el").text
        ans = int(ans.strip()[1:]) * 1000
        # returning the price
        return ans

    gold = goldPrice()
    silver = silverPrice()

    # writing in csv file

    def writeInCSV():

        # data to be added
        data = [[gold, silver]]

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
    writeInCSV()
    deleteInCSV()

    # run prediction files here
    # how to get previous seven days data? => wittingly from dataset (prices.csv)
    # append output in forecast array
    #
    # rapid_api here
    # one rapid_api from archit, one from you ->since only 50 per-month free
    # append the gold and silver price and delete the first , i.e => (today-60)th data data
    # also append in metalprice array

    arrayGold = predictGold()
    arraySilver = predictSilver()

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
    # index 7 has, 8'th element => today's element
    # you can show the daily changes also
    return jsonify({"Gold": [foreCastArray_gold[7], foreCastArray_gold[7]-foreCastArray_gold[6]], "Silver": [foreCastArray_silver[7], foreCastArray_silver[7]-foreCastArray_silver[6]]})


@app.route('/forecast')
def forecast():
    return jsonify({"Gold Array: ": foreCastArray_gold, "Silver Array": foreCastArray_silver})


# while(True):

#     for i in foreCastArray_gold:
#         print(i, end=" ")

#     for i in foreCastArray_silver:
#         print(i, end=" ")

#     time.sleep(35)
