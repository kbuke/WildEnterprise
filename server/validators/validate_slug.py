import re

def validate_slug(
    value
):
    slug_pattern = (r'[^a-z0-9]+', '-', value.lower()).strip("-")

    if not re.match(slug_pattern, value):
        raise ValueError("Please enter a valid slug-title")

    return slug_pattern