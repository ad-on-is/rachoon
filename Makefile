# Makefile for ARM Docker image build and testing
.PHONY: help build-arm test-arm clean test-all

help: ## Show this help message
	@echo "Rachoon ARM Docker Image Build System"
	@echo "====================================="
	@echo ""
	@echo "Available targets:"
	@echo "  build-arm     - Build multi-architecture Docker image"
	@echo "  test-arm      - Test ARM compatibility"
	@echo "  test-all      - Run all tests"
	@echo "  clean         - Clean up build artifacts"
	@echo "  help          - Show this help message"

build-arm: ## Build multi-architecture Docker image
	@echo "Building multi-architecture Docker image..."
	@chmod +x build-arm.sh
	@./build-arm.sh

test-arm: ## Test ARM compatibility
	@echo "Testing ARM compatibility..."
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
	@echo "Cleanup complete"

setup: ## Setup build environment
	@echo "Setting up build environment..."
	@chmod +x *.sh
	@docker buildx version || echo "Warning: Docker Buildx not available"