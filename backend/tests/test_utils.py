import unittest
from backend.utils import *

class TestUtils(unittest.TestCase):
    def test_CompareHash(self):
        test_pws = ["this is a test", "akjfhsa1923$@$@Y", "jzhuanwar12345@#$"]
        for pw in test_pws:
            hashed = hash(pw)
            # print(hashed.encode("utf-8"))
            self.assertTrue(compare_hashes(pw, hashed))
        
        # self.assertTrue(compare_hashes(hash("hi"), "hi"))


if __name__ == "__main__":
    unittest.main()