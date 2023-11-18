from flask import Flask, jsonify
import pickle

app = Flask(__name__)


@app.route("/recommend/<user_id>")
def get_recommendations(user_id):
    # Load mô hình từ file pickle
    with open("knn_recommendation_model.pkl", "rb") as file:
        model = pickle.load(file)

    all_item = [model.trainset.to_raw_iid(iid) for iid in model.trainset.all_items()]
    product_rated = [
        model.trainset.to_raw_iid(iid)
        for uid, iid, rating in model.trainset.all_ratings()
        if model.trainset.to_raw_uid(uid) == user_id
    ]
    product_unrated = set(all_item) - set(product_rated)
    predictions = [
        model.predict(user_id, product_id)[1] for product_id in product_unrated
    ]
    return jsonify({"recommendations": predictions})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
