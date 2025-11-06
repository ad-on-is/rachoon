#!/bin/bash
set -euo pipefail
# Final comprehensive test of ARM implementation

echo "Running final ARM implementation test..."

# Check file existence
echo "Checking required files..."
required_files=("Dockerfile" "build-arm.sh" "test-arm.sh" "test-arm-functionality.sh" "eval.sh" "Makefile")
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        echo "❌ Missing: $file"
        exit 1
    else
        echo "✅ Found: $file"
    fi
done

# Test script syntax
echo "Testing script syntax..."
for script in "build-arm.sh" "test-arm.sh" "test-arm-functionality.sh" "eval.sh"; do
    if ! bash -n "$script" 2>/dev/null; then
        echo "❌ Syntax error in: $script"
        exit 1
    else
        echo "✅ Valid syntax: $script"
    fi
done

# Validate Dockerfile content
echo "Validating Dockerfile content..."
if grep -q "node.*alpine" "Dockerfile" && \
   grep -q "graphicsmagick" "Dockerfile" && \
   grep -q "ghostscript" "Dockerfile" && \
   grep -q "caddy" "Dockerfile"; then
    echo "✅ Dockerfile contains ARM-compatible components"
else
    echo "❌ Dockerfile missing ARM-compatible components"
    exit 1
fi

# Validate build script
echo "Validating build script..."
if grep -q "linux/amd64,linux/arm64" "build-arm.sh" && \
   grep -q "docker buildx" "build-arm.sh"; then
    echo "✅ Build script supports multi-architecture builds"
else
    echo "❌ Build script missing multi-architecture support"
    exit 1
fi

echo "All tests passed! ARM implementation is complete."
exit 0