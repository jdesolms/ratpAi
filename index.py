from flask import Flask, request, make_response, jsonify

# initialize the flask app
app = Flask(__name__)

# default route
@app.route('/')
def index():
    return 'Hello World!'

# function for responses
def results():
    result = {}
    result["fulfillmentText"] = "reponse"
    result = jsonify(result)

    return make_response(result)
    req = request.get_json(force=True)
    action = req.get('queryResult').get('action')
    result = {} # an empty dictionary

    if action == "actions.intent.MAIN":
        # your action statements here
        # do whatever you want
        # return response in dialogflow response format
        # i am going to use Dialogflow JSON reponse format
        # first build result json

        

        # fulfillment text is the default response that is returned to the dialogflow request
        result["fulfillmentText"] = "your response message here"

        # you can also make rich respones like basic card, simple responses, list, table card etc.
        # you can refer this for rich response formats
        # https://github.com/dialogflow/fulfillment-webhook-json

        # you can also use custom payloads for different services like messenger or google assistant
        # below is an example of google assistant payload
        # the following paylod contains a simple response, a basic card and some suggestion chips.

        # reply["payload"] = {
            # "google": {
            # "expectUserResponse": True,
            # "richResponse": {
                # "items": [
                # {
                    # "simpleResponse": {
                        # "displayText": 'text to be displayed',
                        # "textToSpeech": 'text that will be used for text to speech'
                    # }
                # },
                # {
                    # "basicCard": {
                        # "title": "card title",
                        # "subtitle": "card subtitle",
                        # "imageDisplayOptions": "WHITE"
                    # }
                # }
                # ],
                # "suggestions": [
                    # {
                        # "title": "chip 1"
                    # },
                    # {
                        # "title": "chip 2"
                    # }
                # ],
            # }
            # }
        # }

        # jsonify the result dictionary
        # this will make the response mime type to application/json
        result = jsonify(result)

        # return the result json
        return make_response(result)
    else :
        result["fulfillmentText"] = "reponse"
        result = jsonify(result)

        return make_response(result)

# create a route for webhook
@app.route('/webhook', methods=['GET', 'POST'])
def webhook():
    # return response
    return results


    # run the app
if __name__ == '__main__':
   app.run(host='0.0.0.0',port=8000)