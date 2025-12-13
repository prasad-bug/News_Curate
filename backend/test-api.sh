#!/bin/bash

# NewsCurate Backend - Quick Test Script
# This script tests all the main API endpoints

BASE_URL="http://localhost:5000/api"

echo "=================================="
echo "NewsCurate Backend API Tests"
echo "=================================="
echo ""

# Test 1: Health Check
echo "1. Testing server health..."
curl -s http://localhost:5000/ | jq '.'
echo ""

# Test 2: Register a new user
echo "2. Registering a new user..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }')

echo $REGISTER_RESPONSE | jq '.'
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.token')
echo "Token: $TOKEN"
echo ""

# Test 3: Login
echo "3. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

echo $LOGIN_RESPONSE | jq '.'
echo ""

# Test 4: Get current user
echo "4. Getting current user..."
curl -s -X GET $BASE_URL/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 5: Update preferences
echo "5. Updating user preferences..."
curl -s -X PUT $BASE_URL/user/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"topics": ["tech", "sports", "politics"]}' | jq '.'
echo ""

# Test 6: Get preferences
echo "6. Getting user preferences..."
curl -s -X GET $BASE_URL/user/preferences \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 7: Get all articles
echo "7. Getting all articles..."
curl -s -X GET $BASE_URL/articles | jq '.'
echo ""

echo "=================================="
echo "Basic tests completed!"
echo "=================================="
echo ""
echo "For admin tests, you need to:"
echo "1. Update user role to 'admin' in MongoDB"
echo "2. Test admin endpoints with admin token"
echo ""
