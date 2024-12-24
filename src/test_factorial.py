import unittest
from unittest.mock import patch
from io import StringIO
import factorial

class TestFactorial(unittest.TestCase):

    @patch('builtins.input', return_value='5')
    def test_get_factorial(self, mock_input):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            factorial.get_factorial()
        self.assertEqual(mock_stdout.getvalue(), "The factorial of 5 is 120\n")

    @patch('builtins.input', return_value='0')
    def test_get_factorial_zero(self, mock_input):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            factorial.get_factorial()
        self.assertEqual(mock_stdout.getvalue(), "The factorial of 0 is 1\n")

    @patch('builtins.input', return_value='-1\n2')
    def test_get_factorial_negative(self, mock_input):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            factorial.get_factorial()
        self.assertEqual(mock_stdout.getvalue(), "Please enter a non-negative integer.\nThe factorial of 2 is 2\n")

    @patch('builtins.input', return_value='a\n2')
    def test_get_factorial_invalid_input(self, mock_input):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            factorial.get_factorial()
        self.assertEqual(mock_stdout.getvalue(), "Invalid input. Please enter an integer.\nThe factorial of 2 is 2\n")


if __name__ == '__main__':
    unittest.main()
