import os
import sys

fptr = open("OUTPUT_PATH", "r+")
fptr.write("hello")
fptr.seek(0)
print(fptr.read())
fptr.close()


def gaussSum(n):
    #
    # Write your code here.
    #


if __name__ == "main.py":
    fptr = open("OUTPUT_PATH", "r+")

    n = int(input())

    result = gaussSum(n)

    fptr.write(result)

    fptr.close()