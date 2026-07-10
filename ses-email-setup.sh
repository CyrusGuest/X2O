#!/bin/bash

echo "==========================================="
echo "  AWS SES Email Setup for xsolut.ai"
echo "==========================================="
echo ""

# Check domain registration status
echo "Checking domain status..."
aws route53domains get-operation-detail \
  --operation-id d75a4666-2062-4998-8eec-17ec9a32744a \
  --region us-east-1 \
  --query 'Status' \
  --output text

echo ""
echo "Setting up AWS SES for sending emails..."
echo ""

# 1. Verify domain in SES
echo "Step 1: Verifying domain in SES..."
aws ses verify-domain-identity --domain xsolut.ai --region us-east-1

# 2. Get DKIM tokens
echo ""
echo "Step 2: Getting DKIM tokens..."
aws ses put-identity-dkim-attributes \
  --identity xsolut.ai \
  --dkim-enabled \
  --region us-east-1

DKIM_TOKENS=$(aws ses get-identity-verification-attributes \
  --identities xsolut.ai \
  --region us-east-1 \
  --query 'VerificationAttributes."xsolut.ai".VerificationToken' \
  --output text)

echo "DKIM Tokens received"

# 3. Create SES configuration set
echo ""
echo "Step 3: Creating configuration set..."
aws ses put-configuration-set \
  --configuration-set Name=xsolut-config \
  --region us-east-1 2>/dev/null || echo "Config set exists"

# 4. Request production access (remove sandbox)
echo ""
echo "Step 4: Request production access..."
echo "Current sending quota:"
aws ses get-send-quota --region us-east-1

echo ""
echo "==========================================="
echo "  DNS Records to Add in Route 53"
echo "==========================================="
echo ""
echo "After domain is active, add these records:"
echo ""
echo "1. MX Records (for receiving with ImprovMX):"
echo "   10 mx1.improvmx.com"
echo "   20 mx2.improvmx.com"
echo ""
echo "2. SPF Record:"
echo "   TXT: 'v=spf1 include:amazonses.com include:spf.improvmx.com ~all'"
echo ""
echo "3. DKIM Records (will be provided by SES)"
echo "4. DMARC Record:"
echo "   TXT _dmarc: 'v=DMARC1; p=quarantine; rua=mailto:admin@xsolut.ai'"
echo ""
echo "==========================================="
echo "  Email Receiving Options"
echo "==========================================="
echo ""
echo "Option A: ImprovMX (FREE)"
echo "1. Sign up at https://improvmx.com"
echo "2. Add domain xsolut.ai"
echo "3. Create aliases:"
echo "   - admin@xsolut.ai → your-email"
echo "   - support@xsolut.ai → your-email"
echo "   - help@xsolut.ai → your-email"
echo ""
echo "Option B: ForwardEmail (FREE)"
echo "1. Sign up at https://forwardemail.net"
echo "2. Similar setup to ImprovMX"
echo ""
echo "Option C: Zoho Mail ($1/user/month)"
echo "1. Professional email with full inbox"
echo "2. Calendar, contacts, etc."
echo "3. Better for teams"
echo ""
echo "==========================================="