def check_string(value):
    if isinstance(value, bool) or value is None:
        raise ValueError("Value can not be a Boolean or None-Value")

    if not isinstance(value, str):
        try:
            value = str(value)
        except TypeError:
            raise TypeError("Value must be a string")

    if value == "" or value.strip() == "":
        raise ValueError("Value can not be an empty string")

    return value