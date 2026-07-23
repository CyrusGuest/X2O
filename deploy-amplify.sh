#!/bin/bash

echo "🚀 Setting up AWS Amplify deployment with GitHub"
echo ""
echo "Step 1: GitHub Authentication"
echo "------------------------------"
echo "First, we need to authenticate with GitHub."
echo ""

# Try to authenticate with GitHub
if ! gh auth status &>/dev/null; then
    echo "Please authenticate with GitHub:"
    gh auth login --git-protocol https --web

    echo ""
    echo "Waiting for authentication..."
    while ! gh auth status &>/dev/null; do
        sleep 2
    done
fi

echo "✅ GitHub authenticated!"
echo ""

echo "Step 2: Creating GitHub Personal Access Token"
echo "----------------------------------------------"
echo "Creating a token for AWS Amplify..."

# Create a personal access token
TOKEN=$(gh auth token)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get GitHub token"
    exit 1
fi

echo "✅ Token created!"
echo ""

echo "Step 3: Creating AWS Amplify App"
echo "---------------------------------"

# Create Amplify app with GitHub repository
APP_ID=$(aws amplify create-app \
    --name X2O \
    --region us-east-1 \
    --platform WEB \
    --repository https://github.com/cyrusguest/X2O \
    --oauth-token "$TOKEN" \
    --description "X2O AI Solutions Platform" \
    --build-spec "$(cat amplify.yml)" \
    --enable-branch-auto-build \
    --query 'app.appId' \
    --output text)

if [ -z "$APP_ID" ]; then
    echo "❌ Failed to create Amplify app"
    exit 1
fi

echo "✅ App created: $APP_ID"
echo ""

echo "Step 4: Creating Main Branch"
echo "-----------------------------"

# Create main branch
aws amplify create-branch \
    --app-id "$APP_ID" \
    --branch-name main \
    --region us-east-1 \
    --enable-auto-build \
    --enable-notification

echo "✅ Branch created!"
echo ""

echo "Step 5: Starting Initial Build"
echo "-------------------------------"

# Start a build
JOB_ID=$(aws amplify start-job \
    --app-id "$APP_ID" \
    --branch-name main \
    --job-type RELEASE \
    --region us-east-1 \
    --query 'jobSummary.jobId' \
    --output text)

echo "Build started: Job ID $JOB_ID"
echo "Monitoring build status..."

# Monitor build
while true; do
    STATUS=$(aws amplify get-job \
        --app-id "$APP_ID" \
        --branch-name main \
        --job-id "$JOB_ID" \
        --region us-east-1 \
        --query 'job.summary.status' \
        --output text)

    echo "Build status: $STATUS"

    if [ "$STATUS" = "SUCCEED" ]; then
        echo "✅ Build completed successfully!"
        break
    elif [ "$STATUS" = "FAILED" ]; then
        echo "❌ Build failed!"
        exit 1
    fi

    sleep 10
done

echo ""
echo "Step 6: Connecting Domain"
echo "-------------------------"

# Connect domain
aws amplify create-domain-association \
    --app-id "$APP_ID" \
    --domain-name xsolut.ai \
    --region us-east-1 \
    --sub-domain-settings prefix="",branchName=main \
    --sub-domain-settings prefix="www",branchName=main

echo "✅ Domain connected!"
echo ""
echo "========================================="
echo "  DEPLOYMENT COMPLETE!"
echo "========================================="
echo ""
echo "Your app is deployed at:"
echo "  https://${APP_ID}.amplifyapp.com"
echo ""
echo "Custom domain setup:"
echo "  https://xsolut.ai (will be active in ~30 minutes)"
echo ""
echo "View in AWS Console:"
echo "  https://console.aws.amazon.com/amplify/apps/$APP_ID"
echo ""