### CRUD API Endpoints
---
#### Unit Reservation Checkout

`GET` /rooms/checkout/:listingId

`POST` /rooms/checkout/:listingId

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Listing ID | string | Id of the rentable unit |

---

#### Bookings

`GET` /rooms/bookings/:listingId

`PATCH` /rooms/bookings/:listingId

`DELETE` /rooms/bookings/:listingId

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Listing ID | string | Id of the rentable unit |
