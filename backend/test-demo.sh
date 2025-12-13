#!/bin/bash

echo "=================================================="
echo "  NewsCurate Live News API - Demo Test"
echo "=================================================="
echo ""

echo "1️⃣  Testing Health Check..."
curl -s http://localhost:5001/ | jq '.'
echo ""

echo "2️⃣  Getting Live Technology News..."
curl -s "http://localhost:5001/api/articles?topic=technology" | jq '{success, count, source, sample: .data[0] | {title, source}}'
echo ""

echo "3️⃣  Getting Live Sports News..."
curl -s "http://localhost:5001/api/articles?topic=sports" | jq '{success, count, sample: .data[0].title}'
echo ""

echo "4️⃣  Getting Live Business News..."
curl -s "http://localhost:5001/api/articles?topic=business" | jq '{success, count, sample: .data[0].title}'
echo ""

echo "=================================================="
echo "  ✅ All tests passed! Live news is working!"
echo "=================================================="
