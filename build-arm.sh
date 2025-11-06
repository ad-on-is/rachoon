#!/bin/bash
set -euo pipefail

# Multi-architecture build script for Rachoon
# Builds Docker images for AMD64 and ARM64 architectures

IMAGE_NAME="${IMAGE_NAME:-ghcr.io/ad-on-is/rachoon}"
VERSION="${VERSION:-latest}"

echo "🏗️  Building multi-architecture Docker image for Rachoon"
echo "Image: $IMAGE_NAME:$VERSION"
echo "Platforms: linux/amd64, linux/arm64"

# Check if Docker Buildx is available
if ! docker buildx version &> /dev/null; then
    echo "❌ Docker Buildx is not available. Please install Docker Desktop or enable buildx."
    exit 1
fi

# Create or use existing builder instance
if ! docker buildx inspect multiarch-builder &> /dev/null; then
    echo "🔧 Creating buildx builder instance..."
    docker buildx create --name multiarch-builder --use
else
    echo "✅ Using existing buildx builder instance..."
    docker buildx use multiarch-builder
fi

# Bootstrap the builder
docker buildx inspect --bootstrap

# Build for multiple platforms
echo "🚀 Building for linux/amd64 and linux/arm64..."
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --tag "$IMAGE_NAME:$VERSION" \
    --tag "$IMAGE_NAME:arm64" \
    --tag "$IMAGE_NAME:amd64" \
    --push \
    .

echo "✅ Multi-architecture build completed successfully!"
echo "📦 Available tags:"
echo "  - $IMAGE_NAME:$VERSION"
echo "  - $IMAGE_NAME:arm64"
echo "  - $IMAGE_NAME:amd64"

# Display build info
echo ""
echo "📋 Build information:"
docker buildx imagetools inspect "$IMAGE_NAME:$VERSION"