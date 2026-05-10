#!/bin/bash

mkdir -p public/images/cities

echo "Downloading All City Images (LoremFlickr - NO RATE LIMIT)..."

cities=(
  "paris" "tokyo" "dubai" "newyork" "bali" "london" "bangkok" "rome" "edinburgh" "capetown" "santorini" "sydney" "mumbai" "delhi" "jaipur" "agra" "kolkata" "hyderabad" "chennai" "manchester" "liverpool" "oxford" "moscow" "stpetersburg" "sochi" "kazan" "jakarta" "yogyakarta" "ubud"
)

for city in "${cities[@]}"; do
  echo "Fetching $city..."
  # LoremFlickr is very reliable
  curl -L -s -o "public/images/cities/$city.jpg" "https://loremflickr.com/1024/576/$city,travel"
done

echo "Done! All city images downloaded."
