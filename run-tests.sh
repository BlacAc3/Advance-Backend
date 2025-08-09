#!/bin/bash

# Test Runner Script for AdvancePay Backend
# This script provides various options for running tests

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    echo -e "${2}${1}${NC}"
}

# Function to print header
print_header() {
    echo ""
    print_color "========================================" "$BLUE"
    print_color "$1" "$BLUE"
    print_color "========================================" "$BLUE"
    echo ""
}

# Function to show help
show_help() {
    print_header "AdvancePay Backend Test Runner"
    echo "Usage: ./run-tests.sh [option]"
    echo ""
    echo "Options:"
    echo "  all         - Run all tests (default)"
    echo "  unit        - Run unit tests only"
    echo "  integration - Run integration tests only"
    echo "  services    - Run service layer tests"
    echo "  auth        - Run authentication tests"
    echo "  employer    - Run employer tests"
    echo "  employee    - Run employee tests"
    echo "  marketer    - Run marketer tests"
    echo "  payroll     - Run payroll tests"
    echo "  coverage    - Run tests with coverage"
    echo "  watch       - Run tests in watch mode"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./run-tests.sh unit"
    echo "  ./run-tests.sh coverage"
    echo "  ./run-tests.sh auth"
    echo ""
}

# Function to check if required dependencies are installed
check_dependencies() {
    if ! command -v npm &> /dev/null; then
        print_color "Error: npm is not installed" "$RED"
        exit 1
    fi

    if ! command -v node &> /dev/null; then
        print_color "Error: Node.js is not installed" "$RED"
        exit 1
    fi
}

# Function to run tests
run_tests() {
    local test_type=$1

    case $test_type in
        "all")
            print_header "Running All Tests"
            npm test
            ;;
        "unit")
            print_header "Running Unit Tests"
            npx jest --config jest.unit.config.js
            ;;
        "integration")
            print_header "Running Integration Tests"
            npm test -- src/__tests__/
            ;;
        "services")
            print_header "Running Service Layer Tests"
            npm test -- src/db/services/__tests__/
            ;;
        "auth")
            print_header "Running Authentication Tests"
            npm test -- src/__tests__/auth.test.ts
            ;;
        "employer")
            print_header "Running Employer Tests"
            npm test -- src/__tests__/employer.test.ts
            ;;
        "employee")
            print_header "Running Employee Service Tests"
            npm test -- src/db/services/__tests__/employee.test.ts
            ;;
        "marketer")
            print_header "Running Marketer Tests"
            npm test -- src/__tests__/marketer.test.ts
            ;;
        "payroll")
            print_header "Running Payroll Tests"
            npm test -- src/__tests__/payroll.test.ts
            ;;
        "coverage")
            print_header "Running Tests with Coverage"
            npm run test:coverage
            ;;
        "watch")
            print_header "Running Tests in Watch Mode"
            npm run test:watch
            ;;
        *)
            print_color "Unknown option: $test_type" "$RED"
            show_help
            exit 1
            ;;
    esac
}

# Function to print test summary
print_summary() {
    echo ""
    print_color "Test execution completed!" "$GREEN"
    echo ""
    echo "For detailed test results, check:"
    echo "  - TEST_RESULTS_SUMMARY.md for overall status"
    echo "  - coverage/ directory for coverage reports"
    echo ""
}

# Main script
main() {
    check_dependencies

    # Default to running all tests if no argument provided
    if [ $# -eq 0 ]; then
        run_tests "all"
    else
        case $1 in
            "help"|"-h"|"--help")
                show_help
                ;;
            *)
                run_tests "$1"
                ;;
        esac
    fi

    print_summary
}

# Run the main function
main "$@"
