def validate_instance_exists(
        model,
        value,
        key
):
    exists = model.query.get(value)

    if not exists:
        raise ValueError(f"{key} {value} does not exist")
    
    return value