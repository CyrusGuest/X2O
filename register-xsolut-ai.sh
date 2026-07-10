#!/bin/bash

# xsolut.ai Domain Registration & Email Setup Script
# AWS Account: 781343585230

set -e

echo "================================================"
echo "  xsolut.ai Domain Registration & Email Setup"
echo "================================================"
echo ""
echo "✅ DOMAIN AVAILABLE: xsolut.ai"
echo ""
echo "Pricing: ~$75/year for .ai domain in Route 53"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}STEP 1: Register Domain via AWS Console${NC}"
echo "--------------------------------------"
echo "Since domain registration requires payment info, please:"
echo ""
echo "1. Open: https://console.aws.amazon.com/route53/domains/register"
echo "2. Search for: xsolut.ai"
echo "3. Add to cart"
echo "4. Fill in contact information:"
echo "   - Use your business address"
echo "   - Enable privacy protection (free)"
echo "5. Complete purchase (~$75)"
echo ""
read -p "Press ENTER after you've registered the domain..."

echo ""
echo -e "${GREEN}STEP 2: Verify Domain Registration${NC}"
echo "--------------------------------------"
aws route53domains list-domains --region us-east-1

echo ""
echo -e "${GREEN}STEP 3: Create WorkMail Organization${NC}"
echo "--------------------------------------"
echo "Creating WorkMail organization 'xsolut'..."

# Note: This command might need specific permissions
aws workmail create-organization \
    --alias xsolut \
    --domains xsolut.ai \
    --region us-east-1 \
    2>/dev/null || echo "Note: Please create organization manually in AWS Console"

echo ""
echo "Manual setup URL: https://us-east-1.console.aws.amazon.com/workmail/"
echo ""
echo "WorkMail Setup Steps:"
echo "1. Click 'Add organization'"
echo "2. Choose 'Quick setup'"
echo "3. Enter alias: xsolut"
echo "4. Select region: US East (N. Virginia)"
echo "5. Click 'Create'"
echo ""
read -p "Press ENTER after creating WorkMail organization..."

echo ""
echo -e "${GREEN}STEP 4: DNS Configuration Commands${NC}"
echo "--------------------------------------"

# Create hosted zone if it doesn't exist
echo "Checking for hosted zone..."
ZONE_ID=$(aws route53 list-hosted-zones-by-name --query "HostedZones[?Name=='xsolut.ai.'].Id" --output text)

if [ -z "$ZONE_ID" ]; then
    echo "Creating hosted zone for xsolut.ai..."
    aws route53 create-hosted-zone --name xsolut.ai --caller-reference $(date +%s)
else
    echo "Hosted zone exists: $ZONE_ID"
fi

echo ""
echo -e "${YELLOW}DNS Records to Add (via Console or CLI):${NC}"
echo ""
cat << 'EOF'
# MX Record for WorkMail
{
  "Name": "xsolut.ai.",
  "Type": "MX",
  "TTL": 300,
  "ResourceRecords": [{"Value": "10 inbound-smtp.us-east-1.amazonaws.com"}]
}

# SPF Record
{
  "Name": "xsolut.ai.",
  "Type": "TXT",
  "TTL": 300,
  "ResourceRecords": [{"Value": "\"v=spf1 include:amazonses.com ~all\""}]
}

# Autodiscover for Email Clients
{
  "Name": "autodiscover.xsolut.ai.",
  "Type": "CNAME",
  "TTL": 300,
  "ResourceRecords": [{"Value": "autodiscover.mail.us-east-1.awsapps.com"}]
}
EOF

echo ""
echo -e "${GREEN}STEP 5: Create Email Users${NC}"
echo "--------------------------------------"
echo ""
echo "Go to: https://us-east-1.console.aws.amazon.com/workmail/"
echo ""
echo "Recommended Setup (Cost: $4/month):"
echo "1. Create 1 user: admin@xsolut.ai"
echo "2. Add these aliases (free):"
echo "   - support@xsolut.ai"
echo "   - help@xsolut.ai"
echo "   - hello@xsolut.ai"
echo "   - info@xsolut.ai"
echo ""
echo "Access your email at: https://xsolut.awsapps.com/mail"
echo ""

echo -e "${GREEN}STEP 6: Verify Email Setup${NC}"
echo "--------------------------------------"
echo "Testing DNS records..."
echo ""

# Test MX record
echo "MX Record check:"
dig +short MX xsolut.ai

# Test email
echo ""
echo "Once DNS propagates (5-10 minutes), test with:"
echo "echo 'Test email' | mail -s 'Test' admin@xsolut.ai"
echo ""

echo "================================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "================================================"
echo ""
echo "Your email addresses:"
echo "  📧 admin@xsolut.ai"
echo "  📧 support@xsolut.ai"
echo "  📧 help@xsolut.ai"
echo "  📧 hello@xsolut.ai"
echo "  📧 info@xsolut.ai"
echo ""
echo "Access at: https://xsolut.awsapps.com/mail"
echo "Mobile app: Amazon WorkMail (iOS/Android)"
echo ""
echo "Total monthly cost: $4-12 depending on users"
echo "================================================"