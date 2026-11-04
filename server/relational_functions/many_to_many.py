# relational_functions/many_to_many.py
from config import db


def many_to_many_table(table_name, left, right):
    """Association table holding only two ids.
    left / right are (tablename, column_name), e.g. ("articles", "article_id").
    The composite primary key also stops the same pair being linked twice."""
    return db.Table(
        table_name,
        db.Column(left[1], db.Integer,
                  db.ForeignKey(f"{left[0]}.id", ondelete="CASCADE"), primary_key=True),
        db.Column(right[1], db.Integer,
                  db.ForeignKey(f"{right[0]}.id", ondelete="CASCADE"), primary_key=True),
    )


def many_to_many_relationship(model, secondary, bp_ref):
    """secondary is the association table's NAME as a string, which avoids circular imports."""
    return db.relationship(model, secondary=secondary, back_populates=bp_ref)


def set_many_to_many(instance, attr, model, ids):
    """Replaces a relationship with the rows matching `ids`.
    ids=None leaves it untouched, and ids=[] clears it."""
    if ids is None:
        return
    if not isinstance(ids, list) or not all(
        isinstance(i, int) and not isinstance(i, bool) for i in ids
    ):
        raise ValueError(f"{attr} must be a list of ids")

    wanted = set(ids)
    found = model.query.filter(model.id.in_(wanted)).all() if wanted else []
    missing = wanted - {obj.id for obj in found}
    if missing:
        raise ValueError(f"{model.__name__} not found: {sorted(missing)}")
    setattr(instance, attr, found)