def check_instance_exists(model, id):
    exists = model.query.filter(model.id == id).first()
    if not exists:
        raise AttributeError(f"{model.__name__} does not have an instance with id: {id}")
    return id