#!/bin/bash

OPERATION_ID="82d61333-2bb6-42f3-8f66-9c53d274a66b"

echo "🔄 Monitoring xsolute.ai registration..."
echo "Cost: ~$50 (2 years @ $25/year)"
echo ""

while true; do
    STATUS=$(aws route53domains get-operation-detail \
        --operation-id $OPERATION_ID \
        --region us-east-1 \
        --query 'Status' \
        --output text)

    echo "$(date '+%H:%M:%S') - Registration status: $STATUS"

    if [ "$STATUS" = "SUCCESSFUL" ]; then
        echo ""
        echo "✅ Domain xsolute.ai registered successfully!"
        echo ""
        echo "Waiting for hosted zone to be created..."
        sleep 30

        # Get hosted zone ID for xsolute.ai
        ZONE_ID=$(aws route53 list-hosted-zones-by-name \
            --query "HostedZones[?Name=='xsolute.ai.'].Id" \
            --output text | cut -d'/' -f3)

        if [ -n "$ZONE_ID" ]; then
            echo "Found hosted zone: $ZONE_ID"
            echo ""
            echo "Setting up redirect to xsolut.ai..."

            # Create redirect bucket in S3
            aws s3api create-bucket \
                --bucket xsolute-ai-redirect \
                --region us-east-1 2>/dev/null || echo "Bucket exists"

            # Configure bucket for website redirect
            aws s3api put-bucket-website \
                --bucket xsolute-ai-redirect \
                --website-configuration '{
                    "RedirectAllRequestsTo": {
                        "HostName": "xsolut.ai",
                        "Protocol": "https"
                    }
                }'

            # Allow public access
            aws s3api put-public-access-block \
                --bucket xsolute-ai-redirect \
                --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

            # Create DNS records pointing to S3 redirect
            cat > /tmp/xsolute-redirect-dns.json << EOF
{
    "Comment": "Redirect xsolute.ai to xsolut.ai",
    "Changes": [
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "xsolute.ai",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z3AQBSTGFYJSTF",
                    "DNSName": "s3-website-us-east-1.amazonaws.com",
                    "EvaluateTargetHealth": false
                }
            }
        },
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "www.xsolute.ai",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [
                    {"Value": "xsolute.ai"}
                ]
            }
        }
    ]
}
EOF

            aws route53 change-resource-record-sets \
                --hosted-zone-id $ZONE_ID \
                --change-batch file:///tmp/xsolute-redirect-dns.json

            echo ""
            echo "✅ Redirect configured!"
            echo ""
            echo "========================================="
            echo "  XSOLUTE.AI REDIRECT SETUP COMPLETE!"
            echo "========================================="
            echo ""
            echo "✅ xsolute.ai → xsolut.ai redirect active"
            echo "✅ www.xsolute.ai → xsolut.ai redirect active"
            echo ""
            echo "DNS will propagate in 5-15 minutes."
            echo ""
            echo "Both domains now point to your X2O site!"
            echo "========================================="
            break
        else
            echo "Hosted zone not found yet, waiting..."
        fi

    elif [ "$STATUS" = "FAILED" ]; then
        echo ""
        echo "❌ Domain registration failed!"
        aws route53domains get-operation-detail \
            --operation-id $OPERATION_ID \
            --region us-east-1
        break
    fi

    sleep 60
done