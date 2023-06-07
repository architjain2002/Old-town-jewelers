import re
import random

import io
import string # to process standard python strings
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import nltk
from nltk.stem import WordNetLemmatizer

# uncomment the following only the first time
nltk.download('punkt') # first-time use only
nltk.download('wordnet') # first-time use only
nltk.download('popular', quiet=True) 
# # for downloading packages

# self learning chatbot

with open('data.txt','r', encoding='utf8', errors ='ignore') as fin:
    raw = fin.read().lower()

#TOkenisation
sent_tokens = nltk.sent_tokenize(raw)# converts to list of sentences 
word_tokens = nltk.word_tokenize(raw)# converts to list of words


# Preprocessing
lemmer = WordNetLemmatizer()
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

def response(user_response):
    robo_response=''
    sent_tokens.append(user_response)
    # split using spaces, if find in (either data.corpus) or 'wordnet' nltk dictionary add it,else discard it
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx=vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf==0):
        robo_response=robo_response+"I am sorry! I don't understand you"
        return robo_response
    else:
        robo_response = robo_response+sent_tokens[idx]
        return robo_response

class RuleBot:
    ###Potential Negative Response
    negative_responses=("no","nope","nah","naw","not a chance","sorry")

    ###Exit Conversation keywords
    exit_commands=("quit","pause","exit","goodbye","bye","later")

    ###Random starter question
    # random_question=(
    # 'Whom you want to gift?',
    # 'What do you want to gift?',
    # 'Wanted to check the price?',
    # 'How can I help you?'
    # )


    ###Entire logic of rule bot
    def __init__(self):

        self.ajBabble ={'order':r'\b(order|delivery|track|history)s?\b',
                        'price':r'\b(price|rate|cost|gold|diamond)s?\b',
                        'cart':r'\b(cart|payment)s?\b',
                        'gift':r'\b(gift|present|surpise)s?\b',
                        'product':r'\b(jewellery|product|item|ring|necklace|nose pin|chain|pin|bracelet)s?\b',
                        'website':r'\b(shop|website)\b',
                        'profile':r'\b(owner|profile)\b',
        }

        
    # def greet(self,name):
    #     # self.name=input("What is your name?\n")
    #     will_help=input(
    #         f"Hi {name}, I am AJ. Will you let me know how can I help you?\n"
    #     ) # to remove input to server request

    #     if will_help in self.negative_responses:
    #         print("Ok, I apologize, I am a bot I am here to help you.")
    #         return
        
    #     self.chat()
    

    def make_exit(self,reply):
        for command in self.exit_commands:
            if reply==command:
                print("Okay, have a nice day, please visit us again!")
                return True
    
    # def chat(self):
    #     reply=input(random.choice(self.random_question)).lower()
        
    #     while not self.make_exit(reply):
    #         reply=input(self.match_reply(reply))

    def chat(self,reply): 

        if self.make_exit(reply):
            return "Okay, have a nice day, please visit us again!"  
            
        for key,value in self.ajBabble.items():
            intent=key
            regex_pattern=value
            found_match=re.search(regex_pattern,reply, flags=re.IGNORECASE)
            if found_match and intent == 'order':
                return self.order()
            elif found_match and intent == 'price':
                return self.price()
            elif found_match and intent == 'cart':
                word=found_match.group()
                return self.cart(word)
            elif found_match and intent == 'gift':
                return self.gift()
            elif found_match and intent == 'product':
                word=found_match.group()
                return self.product(word)
            elif found_match and intent == 'website':
                return self.website()
            elif found_match and intent == 'owner':
                return self.owner()

        return response(reply)
        # else :
        #     return response(reply)
        # if not found_match:
        #     return self.no_match_intent()
        #we can run our self learning chatbot pickle file here
    
    
    def order(self):
        responses = ('To learn more about order, go to order page.\n',
                     'So you are asking about your orders right, you can track it in order page\n',
                     'If you have ordered the item, it will delivered soon, check the status in order page\n')
        return random.choice(responses)
    
    def price(self):
        responses = ('Hey fellow, you can check the metal rate detail in homepage\n','Go to homepage to check exclusive metal rates\n')
        return random.choice(responses)
    
    def cart(self,word):
        responses = (f"{word} check in cart page,you can order it now!\n",f"{word}'s detail you can check in cart page.\n")
        return random.choice(responses)
    
    def gift(self):
        responses = ("You can gift designer ring, go and checkout!\n","Many products are waiting for you!\n","Stylish bracelets are there for you!\n")
        return random.choice(responses)
    
    def product(self,word):
        responses = (f"{word} is available in our catalogue, you can explore!\n",f"Everyone loves buying {word}!\n",f"Checkout out {word} in our inventory!\n")
        return random.choice(responses)
    
    def website(self):
        responses = ("This is the online website for our commercial store!\n","Welcome to our jewellery website for AJ_jewellery!\n","We're happy to see you, let's begin you jewellery journey!\n")
        return random.choice(responses)
    
    def owner(self):
        responses = ("You can check your profile in the profile section!\n","You can meet us in person, in our store.\n")
        return random.choice(responses)
    
    # def no_match_intent(self):
    #     responses=("Please tell me more.\n","Tell me more!\n","Why do you say that?\n")
    #     return random.choice(responses)
    

AlienBot=RuleBot()
AlienBot.chat("jewellery")

