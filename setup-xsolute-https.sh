#!/bin/bash

echo "🔐 Setting up HTTPS for xsolute.ai redirect..."
echo ""

CERT_ARN="arn:aws:acm:us-east-1:781343585230:certificate/49cd075a-73a8-459a-9f68-ce90e13d4ed2"

# Wait for certificate validation
echo "Waiting for SSL certificate validation..."
while true; do
    STATUS=$(aws acm describe-certificate \
        --certificate-arn "$CERT_ARN" \
        --region us-east-1 \
        --query "Certificate.Status" \
        --output text)

    if [ "$STATUS" = "ISSUED" ]; then
        echo "✅ Certificate validated!"
        break
    fi
    echo "Certificate status: $STATUS (waiting...)"
    sleep 10
done

# Create CloudFront distribution for HTTPS redirect
echo ""
echo "Creating CloudFront distribution..."

cat > /tmp/xsolute-cf-config.json << 'EOF'
{
    "CallerReference": "xsolute-ai-redirect-$(date +%s)",
    "Comment": "HTTPS redirect from xsolute.ai to xsolut.ai",
    "DefaultRootObject": "",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-xsolute-ai-redirect",
                "DomainName": "xsolute-ai-redirect.s3-website-us-east-1.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-xsolute-ai-redirect",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "Compress": true
    },
    "Enabled": true,
    "Aliases": {
        "Quantity": 2,
        "Items": [
            "xsolute.ai",
            "www.xsolute.ai"
        ]
    },
    "ViewerCertificate": {
        "ACMCertificateArn": "CERT_ARN_PLACEHOLDER",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021"
    }
}
EOF

# Replace certificate ARN
sed -i '' "s|CERT_ARN_PLACEHOLDER|$CERT_ARN|g" /tmp/xsolute-cf-config.json
sed -i '' "s|\$(date +%s)|$(date +%s)|g" /tmp/xsolute-cf-config.json

# Create CloudFront distribution
CF_RESULT=$(aws cloudfront create-distribution \
    --distribution-config file:///tmp/xsolute-cf-config.json \
    --region us-east-1 \
    --output json)

CF_ID=$(echo "$CF_RESULT" | jq -r '.Distribution.Id')
CF_DOMAIN=$(echo "$CF_RESULT" | jq -r '.Distribution.DomainName')

echo "✅ CloudFront distribution created!"
echo "   Distribution ID: $CF_ID"
echo "   Domain: $CF_DOMAIN"
echo ""

# Update DNS to point to CloudFront
echo "Updating DNS records to use CloudFront..."

ZONE_ID="Z05971461AZEKKOF1215R"

cat > /tmp/xsolute-dns-update.json << EOF
{
    "Comment": "Update xsolute.ai to use CloudFront for HTTPS",
    "Changes": [
        {
            "Action": "DELETE",
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
            "Action": "DELETE",
            "ResourceRecordSet": {
                "Name": "www.xsolute.ai",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [
                    {"Value": "xsolute.ai"}
                ]
            }
        },
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "xsolute.ai",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2",
                    "DNSName": "$CF_DOMAIN",
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
                    {"Value": "$CF_DOMAIN"}
                ]
            }
        }
    ]
}
EOF

aws route53 change-resource-record-sets \
    --hosted-zone-id $ZONE_ID \
    --change-batch file:///tmp/xsolute-dns-update.json

echo ""
echo "==========================================="
echo "  XSOLUTE.AI HTTPS SETUP COMPLETE!"
echo "==========================================="
echo ""
echo "✅ SSL certificate issued"
echo "✅ CloudFront distribution created"
echo "✅ DNS updated to CloudFront"
echo ""
echo "HTTPS redirects will be active in ~15 minutes:"
echo "  https://xsolute.ai → https://xsolut.ai"
echo "  https://www.xsolute.ai → https://xsolut.ai"
echo ""
echo "==========================================="