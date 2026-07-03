from config import db

def many_to_many(
        model,
        relationAttribute,
        tableName
):
    relation = db.relationship(model, back_populates = relationAttribute, secondary = tableName)
    return relation