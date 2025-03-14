def create_prompt(recipe):
    return f"""You are a recipe creation expert. Create a recipe for the indicated dish. Follow the specific instructions given below.\
            \
            Here is the dish I want you to create a recipe for: {recipe}\
            
            Return only the desired ingredients needed to make the dish and how much of each ingredient is needed. Return the list of\
            ingredients as a JSON list where each ingredient is a key and has a value of its quantity.\
            Only return the ingredients and quantity, no extra adjectives for the ingredients describing how they are prepared\
            Do not provide any instructions on how to make the dish anywhere.\
            
            IMPORTANT: do not provide any headers or specifications for the lists of ingredients, only provide the JSON list.
            IMPORTANT: do not include any markdown elements, this is not being used for display.
            """