# Contains utility functions
import bcrypt
# from backend import bcrypt

# TODO: write unit tests


def hash(raw_text):
    # Convert password to array of bytes, generate salt and hash
    password = raw_text.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password, salt)

    # print(type(hashed))
    return hashed
    # return bcrypt.generate_password_hash(password).decode("utf-8")


def compare_hashes(user_entered_pw, stored_hash_pw):
    # TODO: read this: https://stackoverflow.com/questions/9559549/how-to-compare-plain-text-password-to-hashed-password-using-bcrypt
    # return bcrypt.checkpw(user_entered_pw.encode("utf-8"), stored_hash_pw)
    return stored_hash_pw == bcrypt.hashpw(user_entered_pw.encode("utf-8"), stored_hash_pw)
    # return bcrypt.check_password_hash(user_entered_pw, stored_hash_pw)

