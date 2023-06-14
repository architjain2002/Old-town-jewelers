# importing libraries
from bs4 import BeautifulSoup as BS
import requests


# method to get the price of gold
def get_price(url):

    # getting the request from url
    data = requests.get(url)

    # converting the text
    soup = BS(data.text, 'html.parser')

    # finding meta info for the current price
    ans = soup.find("span", class_="ltp").text
    ans = float(ans.replace(",", ""))
    # returning the price
    return ans


# url of the gold price
url = "https://economictimes.indiatimes.com/markets/gold-rate-in-india-today"

# calling the get_price method
ans = get_price(url)

# printing the ans
print(ans)
