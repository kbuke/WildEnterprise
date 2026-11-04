# models/ArticleAssociations.py
from relational_functions.many_to_many import many_to_many_table

article_parks = many_to_many_table(
    "article_parks", ("articles", "article_id"), ("parks", "park_id"))

# Check this matches EventModel.__tablename__
article_events = many_to_many_table(
    "article_events", ("articles", "article_id"), ("events", "event_id"))

article_projects = many_to_many_table(
    "article_projects", ("articles", "article_id"), ("projects", "project_id"))