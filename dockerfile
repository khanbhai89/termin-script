FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Install Xvfb
RUN apt-get update && apt-get install -y xvfb

# Set environment variable for display
ENV DISPLAY=:99

# Command to start Xvfb, install dependencies, and run tests
CMD Xvfb :99 -screen 0 1280x720x16 & npm install && npx playwright test --headed
