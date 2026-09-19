from sqlalchemy import func

from functions.check_normalise_values import check_normalise_values

def check_unique(model, key, value):

    normalised_value = check_normalise_values(value)

    column = getattr(model, key)

    exists = model.query.filter(
        func.lower(
            func.replace(column, " ", "")
        ) == normalised_value
    ).first()

    if exists:
        raise AttributeError(
            f"{value} is already registered at {model.__name__}"
        )

    return value