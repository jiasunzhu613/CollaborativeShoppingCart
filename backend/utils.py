# Contains utility functions
import bcrypt

# TODO: write unit tests


def hash(raw_text):
    # Convert password to array of bytes, generate salt and hash
    bytes = raw_text.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(bytes, salt)

    return hashed


def compare_hashes(hashed_text, raw_text):
    # TODO: read this: https://stackoverflow.com/questions/9559549/how-to-compare-plain-text-password-to-hashed-password-using-bcrypt
    return hashed_text == bcrypt.hashpw(raw_text.encode("utf-8"), hashed_text)
