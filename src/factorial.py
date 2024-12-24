import math

def get_factorial():
    while True:
        try:
            n = int(input("Enter a non-negative integer: "))
            if n < 0:
                print("Please enter a non-negative integer.")
            else:
                print(f"The factorial of {n} is {math.factorial(n)}")
                break
        except ValueError:
            print("Invalid input. Please enter an integer.")

if __name__ == "__main__":
    get_factorial()


# create test case for the factorial function. AI!
