import string

# Define the code parts given
code_parts = [
    "05_P", "AG91", "_U7V", "196B", "2KR4"
]

# Function to brute-force the missing spots
def brute_force():
    for num in range(10):  # Try all numbers 0-9 for the 3rd spot
        for letter1 in string.ascii_uppercase:  # Try all capital letters for the 9th spot
            for letter2 in string.ascii_uppercase:  # Try all capital letters for the 3rd spot
                # Replace the placeholders with the current number and letters
                code_parts[2] = f"{letter2}{code_parts[2][1:]}"
                code_parts[4] = f"{code_parts[4][:1]}{num}{code_parts[4][2:]}"

                # Print the current code
                print(" ".join(code_parts))

                # Reset the code_parts to the original state for the next iteration
                code_parts[2] = "_U7V"
                code_parts[4] = "2KR4"

# Call the function
brute_force()
