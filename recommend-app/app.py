from flask import Flask, jsonify
from surprise import Dataset, Reader
from surprise import SVD
from surprise.model_selection import train_test_split
import pymongo
import pandas as pd
import pickle

app = Flask(__name__)


@app.route("/recommend/<user_id>")
def get_recommendations(user_id):
    # Load mô hình từ file pickle
    with open("svd_recommendation_model.pkl", "rb") as file:
        model = pickle.load(file)

    all_item = [model.trainset.to_raw_iid(iid) for iid in model.trainset.all_items()]
    product_rated = [
        model.trainset.to_raw_iid(iid)
        for uid, iid, rating in model.trainset.all_ratings()
        if model.trainset.to_raw_uid(uid) == user_id
    ]
    product_unrated = set(all_item) - set(product_rated)
    predictions = [model.predict(user_id, product_id) for product_id in product_unrated]
    sorted_predictions = sorted(predictions, key=lambda x: x.est, reverse=True)
    return jsonify(
        {"recommendations": [prediction.iid for prediction in sorted_predictions]}
    )


@app.route("/update-model")
def update_model():
    client = pymongo.MongoClient(
        "mongodb+srv://minhp4541:Yq1xeFW9lkidNa9b@tech-store.sagkn9g.mongodb.net/?retryWrites=true&w=majority"
    )
    db = client["test"]
    collection = db["rates"]

    # Truy vấn dữ liệu từ MongoDB
    cursor = collection.find({})
    # result = collection.delete_many({})
    df = pd.DataFrame(cursor)
    item = ["_id", "content", "createdAt", "updatedAt", "__v"]
    df = df.drop(columns=item, axis=1)
    df = df.loc[df["score"] != 0]
    df = df[["user", "product", "score"]]
    df.to_csv("data.csv", index=False)

    data = pd.read_csv("data.csv")

    reader = Reader(line_format="user item rating", sep=",", rating_scale=(0, 5))

    dataset = Dataset.load_from_df(data[["user", "product", "score"]], reader)

    trainset = dataset.build_full_trainset()

    model = SVD()
    model.fit(trainset)

    with open("svd_recommendation_model.pkl", "wb") as file:
        pickle.dump(model, file)
    return jsonify({"message": "update model success"})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
