#!/usr/bin/env pwsh

# Remove Flutter from PATH
$env:PATH = ($env:PATH -split ';' | Where-Object { $_ -notmatch 'flutter|C:\\src' }) -join ';'

# Run the build
npm run build

# Exit with the same code as npm
exit $LASTEXITCODE
