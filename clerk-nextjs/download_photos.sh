#!/bin/bash

mkdir -p public/images/cities

echo "Downloading Paris..."
curl -s -o public/images/cities/paris.jpg "https://images.unsplash.com/photo-1502602881469-4478d8a70c32?auto=format&fit=crop&w=3840&q=100"

echo "Downloading Tokyo..."
curl -s -o public/images/cities/tokyo.jpg "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=3840&q=100"

echo "Downloading Dubai..."
curl -s -o public/images/cities/dubai.jpg "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=100"

echo "Downloading New York..."
curl -s -o public/images/cities/newyork.jpg "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=3840&q=100"

echo "Downloading Bali..."
curl -s -o public/images/cities/bali.jpg "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=3840&q=100"

echo "Downloading London..."
curl -s -o public/images/cities/london.jpg "https://images.unsplash.com/photo-1513635269975-5969336cd100?auto=format&fit=crop&w=3840&q=100"

echo "Downloading Bangkok..."
curl -s -o public/images/cities/bangkok.jpg "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=3840&q=100"

echo "Downloading Rome..."
curl -s -o public/images/cities/rome.jpg "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=3840&q=100"

echo "Downloading Edinburgh..."
curl -s -o public/images/cities/edinburgh.jpg "https://image.pollinations.ai/prompt/Edinburgh%20castle%20cityscape%20travel%20photography%20hyperrealistic%204k?width=3840&height=2160&nologo=true"

echo "Downloading Cape Town..."
curl -s -o public/images/cities/capetown.jpg "https://image.pollinations.ai/prompt/Cape%20Town%20Table%20Mountain%20travel%20photography%20hyperrealistic%204k?width=3840&height=2160&nologo=true"

echo "Downloading Santorini..."
curl -s -o public/images/cities/santorini.jpg "https://image.pollinations.ai/prompt/Santorini%20greece%20white%20buildings%20ocean%20travel%20photography%20hyperrealistic%204k?width=3840&height=2160&nologo=true"

echo "Downloading Sydney..."
curl -s -o public/images/cities/sydney.jpg "https://image.pollinations.ai/prompt/Sydney%20opera%20house%20harbor%20travel%20photography%20hyperrealistic%204k?width=3840&height=2160&nologo=true"

echo "All 4K images downloaded successfully!"
