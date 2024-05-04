To run command:

```
docker run -it --rm -v $(pwd):/app -w /app --privileged mcr.microsoft.com/playwright:v1.43.1-jammy /bin/bash
```

Inside docker:

```
xvfb-run -a npm install
xvfb-run -a npx playwright test --headed
```