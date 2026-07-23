#!/bin/bash

echo "🔄 Monitoring Amplify domain setup..."
echo ""

while true; do
    STATUS=$(aws amplify get-domain-association \
        --app-id d18wwinosw7hr3 \
        --domain-name xsolut.ai \
        --region us-east-1 \
        --query 'domainAssociation.domainStatus' \
        --output text)

    echo "$(date '+%H:%M:%S') - Domain status: $STATUS"

    if [ "$STATUS" = "AVAILABLE" ]; then
        echo ""
        echo "✅ Domain is ready!"
        echo ""
        echo "Your site is now accessible at:"
        echo "  🌐 https://xsolut.ai"
        echo "  🌐 https://www.xsolut.ai"
        echo ""
        echo "SSL certificate is active and auto-renewing."
        break
    elif [ "$STATUS" = "FAILED" ]; then
        echo "❌ Domain setup failed!"
        aws amplify get-domain-association \
            --app-id d18wwinosw7hr3 \
            --domain-name xsolut.ai \
            --region us-east-1
        break
    fi

    sleep 30
done