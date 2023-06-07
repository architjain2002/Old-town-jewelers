from chatbot  import *
from flask import Flask, request,jsonify
# from flask_mysqldb import MySQL

app = Flask(__name__)
# mysql = MySQL(app)



@app.route('/')
def home():
    return "Python Sever On"

@app.route('/chat',methods=['POST'])
def users():
    print(request.json)
    return jsonify({"Reply":RuleBot().chat(request.json['chat'])})


# if __name__ == '__main__':
#     app.run()



# print(R)

# /api call route  ->  latest prices
# /updateDB route
# /run ml also