#!/bin/bash
set -euo pipefail

# Multi-architecture Docker build script for Rachoon
# Supports AMD64 and ARM64 architectures

IMAGE_NAME="${IMAGE_NAME:-ghcr.io/ad-on-is/rachoon}"
TAG="${TAG:-latest}"
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"
BUILDER_NAME="multiarch-builder"

echo "Building multi-architecture Docker image: ${IMAGE_NAME}:${TAG}"
echo "Platforms: ${PLATFORMS}"

# Create new buildx builder instance if it doesn't exist
if ! docker buildx inspect "${BUILDER_NAME}" >/dev/null 2>&1; then
    echo "Creating new buildx builder instance: ${BUILDER_NAME}"
    docker buildx create --name "${BUILDER_NAME}" --driver docker-container --use
else
    echo "Using existing buildx builder: ${BUILDER_NAME}"
    docker buildx use "${BUILDER_NAME}"
fi

# Bootstrap the builder
docker buildx inspect --bootstrap

# Build and optionally push the image
BUILD_CMD="docker buildx build --platform ${PLATFORMS} --tag ${IMAGE_NAME}:${TAG} --load ."
PUSH_CMD="docker buildx build --platform ${PLATFORMS} --tag ${IMAGE_NAME}:${TAG} --push ."

if [[ "${PUSH:-0}" == "1" ]]; then
    echo "Building and pushing image to registry..."
    ${PUSH_CMD}
else
    echo "Building image for local testing..."
    ${BUILD_CMD}
fi

echo "✅ Multi-architecture build completed successfully!"
echo "Image: ${IMAGE_NAME}:${TAG}"
echo "Platforms: ${PLATFORMS}"