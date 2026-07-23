#!/bin/bash

APP_ID="d1558u2gm4b8kl"
JOB_ID="2"

echo "🔄 Monitoring build status..."
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

        echo "Now connecting xsolut.ai domain..."
        aws amplify create-domain-association \
            --app-id "$APP_ID" \
            --domain-name xsolut.ai \
            --region us-east-1 \
            --sub-domain-settings prefix="",branchName=main \
            --sub-domain-settings prefix="www",branchName=main 2>/dev/null || echo "Domain already connected"

        echo ""
        echo "✅ Domain setup complete!"
        echo ""
        echo "Your site will be available at:"
        echo "  https://xsolut.ai (in ~30 minutes)"
        echo "  https://www.xsolut.ai (in ~30 minutes)"
        break

    elif [ "$STATUS" = "FAILED" ]; then
        echo ""
        echo "❌ Build failed!"
        echo "Checking logs..."
        aws amplify get-job \
            --app-id "$APP_ID" \
            --branch-name main \
            --job-id "$JOB_ID" \
            --region us-east-1 \
            --query 'job.steps[0].{step:stepName,status:status}' \
            --output table
        break
    fi

    sleep 10
done