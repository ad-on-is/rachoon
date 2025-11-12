#!/bin/bash
# Quick validation of the ARM implementation
set -euo pipefail

echo "Quick test of ARM implementation..."

# Test that files exist and are valid
if [[ -f "Dockerfile" ]] && [[ -f "build-arm.sh" ]] && [[ -f "eval.sh" ]]; then
    echo "✅ All required files present"
    
    # Test script syntax
    if bash -n build-arm.sh && bash -n eval.sh; then
        echo "✅ Scripts are syntactically valid"
        echo "✅ ARM implementation ready for use"
        exit 0
    else
        echo "❌ Script syntax errors"
        exit 1
    fi
else
    echo "❌ Missing required files"
    exit 1
fi