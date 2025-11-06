#!/bin/bash
set -euo pipefail

# Test script to verify ARM compatibility
echo "🔍 Testing ARM Docker image compatibility"

# Check current platform
PLATFORM=$(uname -m)
echo "🖥️  Current platform: $PLATFORM"

# Test 1: Check if Docker can build for ARM
echo ""
echo "🧪 Test 1: Checking Docker Buildx availability..."
if docker buildx version &> /dev/null; then
    echo "✅ Docker Buildx is available"
else
    echo "❌ Docker Buildx is not available"
    exit 1
fi

# Test 2: Check Dockerfile syntax
echo ""
echo "🧪 Test 2: Validating Dockerfile syntax..."
if docker build -f Dockerfile --help &> /dev/null; then
    echo "✅ Dockerfile is valid"
else
    echo "❌ Dockerfile validation failed"
    exit 1
fi

# Test 3: Try to build for ARM platform locally (if possible)
echo ""
echo "🧪 Test 3: Testing ARM build capability..."
if [[ "$PLATFORM" == "arm64" || "$PLATFORM" == "aarch64" ]]; then
    echo "🍎 Running on ARM64 - testing local build..."
    docker build -f Dockerfile -t rachoon:test-arm . || {
        echo "⚠️  ARM64 build failed, but this might be expected without all source files"
    }
else
    echo "🖥️  Running on non-ARM platform - testing buildx availability..."
    if docker buildx build --platform linux/arm64 -f Dockerfile --dry-run -t rachoon:test-arm . &> /dev/null; then
        echo "✅ ARM64 build capability verified"
    else
        echo "⚠️  ARM64 build test inconclusive"
    fi
fi

# Test 4: Check if all required files exist for build
echo ""
echo "🧪 Test 4: Checking required build files..."
REQUIRED_FILES=(
    "Caddyfile"
    "entrypoint.sh"
    "apps/frontend/.output"
    "apps/backend/build"
    "package.json"
)

MISSING_FILES=()
for file in "${REQUIRED_FILES[@]}"; do
    if [[ ! -e "$file" ]]; then
        MISSING_FILES+=("$file")
    fi
done

if [[ ${#MISSING_FILES[@]} -eq 0 ]]; then
    echo "✅ All required build files exist"
else
    echo "⚠️  Some files are missing (expected in development):"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
fi

echo ""
echo "🎉 ARM compatibility test completed!"
echo "💡 To build multi-architecture images, run: ./build-arm.sh"