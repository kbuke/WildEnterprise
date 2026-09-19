def check_not_bool_or_none(value):
    if isinstance(value, bool) or value is None:
        raise ValueError("Value can not be a boolean or None")
    return value