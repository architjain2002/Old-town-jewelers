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
    ans = soup.find("div", id="current-price").find("strong", id="el").text
    ans = float(ans.strip()[1:]) * 1000
    # returning the price
    return ans


# url of the gold price
url = "https://www.goodreturns.in/silver-rates/"

# calling the get_price method
ans = get_price(url)

# printing the ans
print(ans)
