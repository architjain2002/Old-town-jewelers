# %%
# Import req lib

import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.layers import LSTM, Dense
from keras.models import load_model


def predictGold():

    # %%
    # Read the csv file
    df = pd.read_csv('./Prices.csv')

    # %%
    train = df.iloc[:, :1].values

    # %%
    # Normalization

    # %%
    sc = MinMaxScaler()
    sc_train = sc.fit_transform(train)
    sc_train

    # %%
    # Splitting the data
    x_train = []
    y_train = []

    # taking time-frame =7, one week
    for i in range(7, 60):  # t=60
        x_train.append(sc_train[i-7:i, 0])  # [:,:]
        y_train.append(sc_train[i, 0])

    # %%
    # convert list into array
    x_train, y_train = np.array(x_train), np.array(y_train)

    # (1198, 60) to (1198, 60, 1)

    x_train = np.reshape(x_train, (53, 7, 1))

    # %%
    # Building LSTM model

    model = load_model('gold.h5')

    # model = Sequential()
    # model.add(LSTM(5, input_shape=(7,1),return_sequences=True))
    # model.add(Dense(1))

    # # %%

    # model.compile(optimizer='adam',loss='mse')

    # %%
    model.fit(x_train, y_train, batch_size=5, validation_split=0.2, epochs=10)

    # %%
    model.save('gold.h5')

    # %%
    inp = np.reshape(x_train[len(x_train)-1], (1, 7, 1))

    # %%
    ans = model.predict(inp)

    

    # %%
    data_before = df.iloc[-8:, 0].values
    data_after = sc.inverse_transform(ans.reshape(7, 1)).reshape(7).astype(int)
    data = np.concatenate((data_before, data_after), axis=0)
    return data
# %%


# print(predictGold())
# prices api to get today's price(31st day)


# thirtydaydata = [1-30]
# csv.append(newdata)
# read x_train

# model.fit(x_train,y)
# predict(for next 7 days)

# thirdaydata.popfront()
