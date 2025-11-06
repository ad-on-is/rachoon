# Makefile for ARM Docker image build and testing
.PHONY: help build-arm test-arm test-arm-functionality clean test-all setup

help: ## Show this help message
	@echo "Rachoon ARM Docker Image Build System"
	@echo "====================================="
	@echo ""
	@echo "Available targets:"
	@echo "  build-arm              - Build multi-architecture Docker image"
	@echo "  build-arm-with-push    - Build and push multi-arch image to registry"
	@echo "  test-arm               - Test ARM compatibility (quick validation)"
	@echo "  test-arm-functionality - Test ARM build functionality (comprehensive)"
	@echo "  test-all               - Run all tests"
	@echo "  clean                  - Clean up build artifacts"
	@echo "  setup                  - Setup build environment"
	@echo "  help                   - Show this help message"

build-arm: ## Build multi-architecture Docker image locally
	@echo "Building multi-architecture Docker image..."
	@chmod +x build-arm.sh
	@./build-arm.sh

build-arm-with-push: ## Build and push multi-architecture Docker image to registry
	@echo "Building and pushing multi-architecture Docker image..."
	@chmod +x build-arm.sh
	@PUSH=1 ./build-arm.sh

test-arm: ## Test ARM compatibility (quick validation)
	@echo "Testing ARM compatibility (quick check)..."
	@chmod +x test-arm.sh
	@./test-arm.sh

test-arm-functionality: ## Test ARM build functionality (comprehensive)
	@echo "Testing ARM build functionality (comprehensive)..."
	@chmod +x test-arm.sh test-arm-functionality.sh
	@./test-arm.sh
	@./test-arm-functionality.sh

test-all: ## Run all tests
	@echo "Running complete test suite..."
	@chmod +x eval.sh
	@./eval.sh

clean: ## Clean up build artifacts
	@echo "Cleaning up..."
	@docker buildx rm multiarch-builder 2>/dev/null || true
	@docker buildx rm arm-functionality-test 2>/dev/null || true
	@docker buildx rm arm-test-builder 2>/dev/null || true
	@echo "Cleanup complete"

setup: ## Setup build environment
	@echo "Setting up build environment..."
	@docker buildx version || echo "Warning: Docker Buildx not available"
	@chmod +x build-arm.sh test-arm.sh test-arm-functionality.sh eval.sh
	@echo "Setup complete. You can now run 'make build-arm' to build the image."