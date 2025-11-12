#!/bin/bash
set -euo pipefail

# Setup script for ARM build environment
# This script sets up everything needed for ARM Docker builds

echo "🔧 Setting up ARM build environment for Rachoon..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker found: $(docker --version)"

# Check if buildx is available
if ! docker buildx version &> /dev/null; then
    echo "❌ Docker buildx is not available. Please update Docker to a version that supports buildx."
    exit 1
fi

echo "✅ Docker buildx found: $(docker buildx version)"

# Make scripts executable
echo "🔧 Making build scripts executable..."
chmod +x build-arm.sh
chmod +x test-arm.sh
chmod +x test-arm-functionality.sh
chmod +x eval.sh

# Create buildx builder if it doesn't exist
BUILDER_NAME="multiarch-builder"
if ! docker buildx inspect "${BUILDER_NAME}" &> /dev/null; then
    echo "🔧 Creating multi-architecture builder..."
    docker buildx create --name "${BUILDER_NAME}" --driver docker-container --use
    docker buildx inspect --bootstrap
    echo "✅ Multi-architecture builder created and bootstrapped"
else
    echo "✅ Multi-architecture builder already exists"
fi

# Test the build environment
echo "🧪 Testing build environment..."
if docker buildx inspect &> /dev/null; then
    echo "✅ Buildx is working correctly"
else
    echo "❌ Buildx test failed"
    exit 1
fi

echo ""
echo "🎉 ARM build environment setup complete!"
echo ""
echo "Available commands:"
echo "  make build-arm              - Build multi-arch image"
echo "  make build-arm-with-push    - Build and push to registry"
echo "  make test-arm               - Test ARM compatibility"
echo "  make test-arm-functionality - Full ARM functionality test"
echo "  ./eval.sh                   - Run full evaluation"
echo ""
echo "Example usage:"
echo "  # Build for ARM64 and AMD64"
echo "  make build-arm"
echo ""
echo "  # Build and push to registry"
echo "  make build-arm-with-push"