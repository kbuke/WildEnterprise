def validate_unique_pair(
        self, 
        model,
        **kwargs
):
    existing = model.query.filter_by(**kwargs).first()

    if existing and existing.id != self.id:
        raise ValueError("This relationship already exists")