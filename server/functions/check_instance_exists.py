def check_instance_exists(model, id, return_instance = False):
    exists = model.query.filter(model.id == id).first()
    if not exists:
        raise AttributeError(f"{model.__name__} does not have an instance with id: {id}")

    if return_instance == True:
        return exists
    else:
        return id