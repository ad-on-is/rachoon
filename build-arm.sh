#!/bin/bash
set -euo pipefail

# ARM Docker Image Build Script for Rachoon
# Supports multi-architecture builds for AMD64 and ARM64
# Usage: PUSH=1 ./build-arm.sh (to push to registry)

# Configuration
IMAGE_NAME="${IMAGE_NAME:-ghcr.io/ad-on-is/rachoon}"
VERSION="${VERSION:-latest}"

# Check if pushing is enabled
PUSH_FLAG=""
if [ "${PUSH:-}" = "1" ]; then
    PUSH_FLAG="--push"
    echo "🚀 Push mode enabled - will push to registry"
else
    echo "📦 Local build mode - no push to registry"
fi

# Create or use existing multi-architecture builder
echo "Setting up multi-architecture builder..."
if ! docker buildx inspect multiarch-builder &> /dev/null; then
    echo "Creating multiarch-builder..."
    docker buildx create --name multiarch-builder --driver docker-container --use
else
    echo "Using existing multiarch-builder..."
    docker buildx use multiarch-builder
fi

# Bootstrap the builder to ensure it's running
echo "Bootstrapping multiarch-builder..."
docker buildx inspect multiarch-builder --bootstrap

# Build multi-architecture image
echo "Building multi-architecture Docker image..."
echo "Target platforms: linux/amd64, linux/arm64"
echo "Image: ${IMAGE_NAME}:${VERSION}"
echo "Tags: ${IMAGE_NAME}:${VERSION}, ${IMAGE_NAME}:arm64, ${IMAGE_NAME}:amd64"

docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --file Dockerfile \
    --tag "$IMAGE_NAME:$VERSION" \
    --tag "$IMAGE_NAME:arm64" \
    --tag "$IMAGE_NAME:amd64" \
    ${PUSH_FLAG:+--push} \
    .

if [ $? -eq 0 ]; then
    echo "✅ Multi-architecture build completed successfully!"
    
    if [ -n "$PUSH_FLAG" ]; then
        echo "✅ Image pushed to registry"
    else
        echo "📝 To load the image locally:"
        echo "   docker buildx build --load --tag $IMAGE_NAME:$VERSION ."
        echo "📝 To push to registry:"
        echo "   PUSH=1 ./build-arm.sh"
    fi
else
    echo "❌ Build failed!"
    exit 1
fi