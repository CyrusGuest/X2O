#!/bin/bash

APP_ID="d1558u2gm4b8kl"
JOB_ID="3"

echo "🔄 Monitoring build #3 with amplify.yml..."
echo ""

while true; do
    STATUS=$(aws amplify get-job \
        --app-id "$APP_ID" \
        --branch-name main \
        --job-id "$JOB_ID" \
        --region us-east-1 \
        --query 'job.summary.status' \
        --output text)

    echo "$(date '+%H:%M:%S') - Build status: $STATUS"

    if [ "$STATUS" = "SUCCEED" ]; then
        echo ""
        echo "✅ Build succeeded!"
        echo ""
        echo "Your site is live at:"
        echo "  https://${APP_ID}.amplifyapp.com"
        echo ""

        echo "Connecting xsolut.ai domain..."
        aws amplify create-domain-association \
            --app-id "$APP_ID" \
            --domain-name xsolut.ai \
            --region us-east-1 \
            --sub-domain-settings prefix="",branchName=main \
            --sub-domain-settings prefix="www",branchName=main 2>/dev/null || echo "Domain may already be connected"

        echo ""
        echo "🎉 SUCCESS! Your X2O site is deployed!"
        echo ""
        echo "Live URLs:"
        echo "  https://${APP_ID}.amplifyapp.com (working now)"
        echo "  https://xsolut.ai (will be active in ~30 minutes)"
        echo ""
        break

    elif [ "$STATUS" = "FAILED" ]; then
        echo ""
        echo "❌ Build failed!"
        echo "Getting error details..."

        # Try to show the error
        aws amplify get-job \
            --app-id "$APP_ID" \
            --branch-name main \
            --job-id "$JOB_ID" \
            --region us-east-1 \
            --query 'job.steps[?status==`FAILED`].[stepName,status]' \
            --output table

        echo ""
        echo "To view full logs, go to:"
        echo "https://console.aws.amazon.com/amplify/apps/$APP_ID/branches/main/deployments/$JOB_ID"
        break
    fi

    sleep 10
done