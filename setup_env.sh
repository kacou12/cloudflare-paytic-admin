#!/bin/bash
# this script fetch all env variables from CI/CD environment
# and put them to .env file

# App
echo VITE_BASE_API_URL=$VITE_BASE_API_URL >> .env
echo VITE_MOCK_API=$VITE_MOCK_API >> .env
echo VITE_API_URL=$VITE_API_URL >> .env
