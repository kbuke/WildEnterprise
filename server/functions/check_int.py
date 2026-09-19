from functions.check_not_bool_or_none import check_not_bool_or_none

def check_int(value):
    check_not_bool_or_none(value)

    if not isinstance(value, int):
        try:
            value = int(value)
        except ValueError:
            raise ValueError(f"{value} is not an integer")

    return value