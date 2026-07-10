#!/bin/bash

echo "🔄 Monitoring domain activation and will configure DNS automatically..."
echo ""

while true; do
    STATUS=$(aws route53domains get-operation-detail \
        --operation-id d75a4666-2062-4998-8eec-17ec9a32744a \
        --region us-east-1 \
        --query 'Status' \
        --output text)

    echo "$(date '+%H:%M:%S') - Domain registration status: $STATUS"

    if [ "$STATUS" = "SUCCESSFUL" ]; then
        echo "✅ Domain registered successfully!"
        echo ""
        echo "Waiting for hosted zone to be created..."
        sleep 30

        # Get hosted zone ID
        ZONE_ID=$(aws route53 list-hosted-zones-by-name \
            --query "HostedZones[?Name=='xsolut.ai.'].Id" \
            --output text | cut -d'/' -f3)

        if [ -n "$ZONE_ID" ]; then
            echo "Found hosted zone: $ZONE_ID"
            echo "Adding DNS records..."

            aws route53 change-resource-record-sets \
                --hosted-zone-id $ZONE_ID \
                --change-batch file:///Users/cyrusguest/programming/X2O/dns-config.json

            echo "✅ DNS records configured!"
            echo ""
            echo "==================================="
            echo "  FINAL STEPS"
            echo "==================================="
            echo ""
            echo "1. Go to https://improvmx.com"
            echo "2. Sign up and add domain: xsolut.ai"
            echo "3. Create email aliases:"
            echo "   - admin@xsolut.ai → cyrus.t.guest@gmail.com"
            echo "   - support@xsolut.ai → cyrus.t.guest@gmail.com"
            echo "   - help@xsolut.ai → cyrus.t.guest@gmail.com"
            echo ""
            echo "4. You can now:"
            echo "   - Receive emails at these addresses"
            echo "   - Send emails from SES (or your email client)"
            echo ""
            echo "DNS will propagate in 5-10 minutes"
            echo "==================================="
            break
        else
            echo "Hosted zone not found yet, waiting..."
        fi
    elif [ "$STATUS" = "FAILED" ]; then
        echo "❌ Domain registration failed!"
        aws route53domains get-operation-detail \
            --operation-id d75a4666-2062-4998-8eec-17ec9a32744a \
            --region us-east-1
        break
    fi

    sleep 60
done