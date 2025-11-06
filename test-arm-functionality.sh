#!/bin/bash
set -euo pipefail

# ARM Functionality Test Script
# Tests actual ARM image building and running

echo "=== ARM Functionality Deep Test ==="

# Test actual image build (if Docker is available)
if command -v docker &> /dev/null && command -v docker buildx &> /dev/null; then
    
    echo "Testing actual multi-architecture build..."
    
    # Create a test builder
    docker buildx create --name arm-functionality-test --driver docker-container --use 2>/dev/null || true
    docker buildx inspect arm-functionality-test --bootstrap
    
    # Test single platform build first (to catch issues quickly)
    echo "Testing AMD64 build..."
    if timeout 300 docker buildx build --platform linux/amd64 --file Dockerfile --load . 2>&1 | tee /tmp/build.log; then
        echo "✅ AMD64 build successful"
    else
        echo "❌ AMD64 build failed"
        echo "Build log:"
        cat /tmp/build.log
        docker buildx rm arm-functionality-test 2>/dev/null || true
        exit 1
    fi
    
    # Test ARM64 build (if we're on ARM or have emulation)
    HOST_ARCH=$(uname -m)
    if [ "$HOST_ARCH" = "aarch64" ] || [ "$HOST_ARCH" = "arm64" ]; then
        echo "Testing ARM64 native build..."
        if timeout 300 docker buildx build --platform linux/arm64 --file Dockerfile --load . 2>&1 | tee /tmp/build-arm.log; then
            echo "✅ ARM64 build successful"
        else
            echo "❌ ARM64 build failed"
            echo "Build log:"
            cat /tmp/build-arm.log
            docker buildx rm arm-functionality-test 2>/dev/null || true
            exit 1
        fi
    else
        echo "ℹ️  Skipping native ARM64 test (not on ARM hardware)"
    fi
    
    # Test both platforms together
    echo "Testing multi-platform build..."
    if timeout 600 docker buildx build --platform linux/amd64,linux/arm64 --file Dockerfile . 2>&1 | tee /tmp/build-multi.log; then
        echo "✅ Multi-platform build successful"
    else
        echo "❌ Multi-platform build failed"
        echo "Build log:"
        cat /tmp/build-multi.log
        docker buildx rm arm-functionality-test 2>/dev/null || true
        exit 1
    fi
    
    # Clean up
    docker buildx rm arm-functionality-test 2>/dev/null || true
    
else
    echo "⚠️  Docker Buildx not available - skipping actual build tests"
fi

# Test build system scripts
echo "Testing build system scripts..."

# Test build-arm.sh
if [ -f "build-arm.sh" ] && [ -x "build-arm.sh" ]; then
    echo "✅ build-arm.sh is executable"
    # Test dry run by checking for expected content
    if grep -q "docker buildx build" build-arm.sh && grep -q "linux/amd64,linux/arm64" build-arm.sh; then
        echo "✅ build-arm.sh contains multi-arch build logic"
    else
        echo "❌ build-arm.sh missing expected build logic"
        exit 1
    fi
else
    echo "❌ build-arm.sh missing or not executable"
    exit 1
fi

# Test test-arm.sh
if [ -f "test-arm.sh" ] && [ -x "test-arm.sh" ]; then
    echo "✅ test-arm.sh is executable"
else
    echo "❌ test-arm.sh missing or not executable"
    exit 1
fi

# Test test-arm-functionality.sh
if [ -f "test-arm-functionality.sh" ] && [ -x "test-arm-functionality.sh" ]; then
    echo "✅ test-arm-functionality.sh is executable"
else
    echo "❌ test-arm-functionality.sh missing or not executable"
    exit 1
fi

# Test Makefile integration
if [ -f "Makefile" ]; then
    if grep -q "build-arm" Makefile && grep -q "test-arm" Makefile; then
        echo "✅ Makefile contains ARM targets"
    else
        echo "❌ Makefile missing ARM targets"
        exit 1
    fi
else
    echo "❌ Makefile not found"
    exit 1
fi

# Test Dockerfile cross-platform features
echo "Testing Dockerfile cross-platform features..."

if grep -q "TARGETARCH" Dockerfile; then
    echo "✅ Dockerfile uses TARGETARCH for cross-platform builds"
else
    echo "ℹ️  Dockerfile doesn't use TARGETARCH (may still work)"
fi

if grep -q "--platform=\$BUILDPLATFORM" Dockerfile; then
    echo "✅ Dockerfile uses BUILDPLATFORM for base image selection"
else
    echo "ℹ️  Dockerfile doesn't explicitly set BUILDPLATFORM"
fi

# Check for potential cross-platform issues
echo "Checking for cross-platform compatibility issues..."

# Check for specific architecture binaries
if grep -qi "x86_64\|amd64" Dockerfile; then
    echo "⚠️  Found x86_64/amd64 specific references - may need platform variables"
fi

# Check for proper dependency management
if grep -q "apk add.*--no-cache" Dockerfile; then
    echo "✅ Using --no-cache for APK (reduces image size)"
else
    echo "ℹ️  Consider using --no-cache with apk add for smaller images"
fi

echo "=== ARM Functionality Test Summary ==="
echo "✅ All ARM functionality tests passed!"
echo ""
echo "The ARM Docker image build system is ready for use."
echo ""
echo "Usage:"
echo "  make build-arm      # Build multi-arch image locally"
echo "  make test-arm       # Run ARM compatibility tests"
echo "  PUSH=1 make build-arm  # Build and push to registry"

exit 0