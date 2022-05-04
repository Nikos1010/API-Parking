# API-Parking

An API about a parking lot, where a basic CRUD will be performed.

## Rules

- The first three hours count as one.
- After eight hours the fee is the amount of one day.
- If a car stays more than one day, the charge should be per each day even if it stays only a few hours on the last day.

## Example

Price per hours

| Hours | Price (USD) |
| ----- | ------------|
|   3   |       3     |
|   5   |       9     |
|   9   |      57     |

Price per days

| Days  | Price (USD) |
| ----- | ------------|
|   1   |      57     |
|   2   |     114     |
|   4   |     228     |
