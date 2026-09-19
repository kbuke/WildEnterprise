def check_valid_value(data_type, value):
    if value not in data_type:
        raise ValueError(f"{value} not allowed")
    return value