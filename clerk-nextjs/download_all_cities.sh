#!/bin/bash

mkdir -p public/images/cities

echo "Downloading All City Images (4K Pollinations)..."

cities=(
  "paris:Paris Eiffel Tower cityscape"
  "tokyo:Tokyo Shibuya Crossing night"
  "dubai:Dubai Burj Khalifa skyline"
  "newyork:New York Times Square"
  "bali:Bali Uluwatu temple ocean"
  "london:London Big Ben bridge"
  "bangkok:Bangkok temple sunset"
  "rome:Rome Colosseum"
  "edinburgh:Edinburgh castle cityscape"
  "capetown:Cape Town Table Mountain"
  "santorini:Santorini blue domes"
  "sydney:Sydney opera house"
  "mumbai:Mumbai Gateway of India"
  "delhi:Delhi India Gate"
  "jaipur:Jaipur Hawa Mahal"
  "agra:Agra Taj Mahal"
  "kolkata:Kolkata Howrah Bridge"
  "hyderabad:Hyderabad Charminar"
  "chennai:Chennai Marina Beach"
  "manchester:Manchester cityscape"
  "liverpool:Liverpool Albert Dock"
  "oxford:Oxford University"
  "moscow:Moscow Red Square"
  "stpetersburg:Saint Petersburg Hermitage"
  "sochi:Sochi beach mountains"
  "kazan:Kazan Kremlin"
  "jakarta:Jakarta cityscape"
  "ubud:Ubud Bali rice fields"
)

for city_info in "${cities[@]}"; do
  filename="${city_info%%:*}"
  prompt="${city_info#*:}"
  echo "Fetching $filename..."
  encoded_prompt=$(echo "$prompt 4k travel photography" | sed 's/ /%20/g')
  curl -s -o "public/images/cities/$filename.jpg" "https://image.pollinations.ai/prompt/$encoded_prompt?width=1280&height=720&nologo=true"
done

echo "Done! All 28 city images downloaded to public/images/cities/"
