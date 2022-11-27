def preprocessListing(listing):
    listingId = listing.id
    listing = listing.to_dict()
    listing["author"] = preprocessUser(listing["author"].get().to_dict())
    listing["id"] = listingId
    return listing

def preprocessUser(user):
    user.pop("notifs")
    user.pop("password")

    if user["isBusiness"]:
        user.pop("skills")

    return user
