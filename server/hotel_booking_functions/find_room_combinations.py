from itertools import product


def find_room_combinations(room_options, party_size, max_rooms=4):
    """
    room_options: list of {"room": RoomModel, "available": int, "unit_price": float, "contested": bool}
    Returns every combo of (room, quantity) whose combined capacity >= party_size,
    using at most `max_rooms` total room instances, cheapest first, with
    strictly-worse combos pruned out.
    """
    if not room_options:
        return []

    capped = [
        (opt["room"], opt["unit_price"], min(opt["available"], max_rooms))
        for opt in room_options
    ]
    ranges = [range(0, max_qty + 1) for _, _, max_qty in capped]

    combos = []
    for qty_combo in product(*ranges):
        total_rooms = sum(qty_combo)
        if total_rooms == 0 or total_rooms > max_rooms:
            continue

        total_capacity = sum(qty * capped[i][0].max_people for i, qty in enumerate(qty_combo))
        if total_capacity < party_size:
            continue

        total_price = sum(qty * capped[i][1] for i, qty in enumerate(qty_combo))
        selections = [
            {"room": capped[i][0], "quantity": qty}
            for i, qty in enumerate(qty_combo) if qty > 0
        ]

        combos.append({
            "selections": selections,
            "total_rooms": total_rooms,
            "total_capacity": total_capacity,
            "total_price": total_price,
        })

    combos.sort(key=lambda c: (c["total_price"], c["total_rooms"]))

    # Drop combos strictly dominated by a cheaper-or-equal, fewer-or-equal-rooms,
    # same-or-more-capacity alternative — no point showing a worse option.
    pruned = []
    for c in combos:
        dominated = any(
            other is not c
            and other["total_price"] <= c["total_price"]
            and other["total_rooms"] <= c["total_rooms"]
            and other["total_capacity"] >= c["total_capacity"]
            for other in combos
        )
        if not dominated:
            pruned.append(c)

    return pruned