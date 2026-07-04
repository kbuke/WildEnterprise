def validate_options(
        value,
        options
):
    if(value not in options):
        raise ValueError(f"{value} must be one of either {options}")
    
    return value
