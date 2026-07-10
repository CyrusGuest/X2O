# xsolut.ai Domain & Email Setup Guide

## Domain Registration
1. Check availability at: https://www.namecheap.com/domains/registration/results/?domain=xsolut.ai
2. Alternative: Register via AWS Route 53 Console

## Email Setup with AWS SES + ImprovMX

### Step 1: ImprovMX Configuration (Free)
1. Sign up at https://improvmx.com
2. Add domain: xsolut.ai
3. Create email aliases:
   - support@xsolut.ai → your-email@gmail.com
   - help@xsolut.ai → your-email@gmail.com
   - admin@xsolut.ai → your-email@gmail.com
   - hello@xsolut.ai → your-email@gmail.com

### Step 2: AWS SES Setup
```bash
# Verify domain
aws ses verify-domain-identity --domain xsolut.ai --region us-east-1

# Enable DKIM
aws ses put-identity-dkim-attributes \
  --identity xsolut.ai \
  --dkim-enabled --region us-east-1
```

### Step 3: Route 53 DNS Records
```
Type    Name                    Value
MX      @                      10 mx1.improvmx.com
MX      @                      20 mx2.improvmx.com
TXT     @                      "v=spf1 include:spf.improvmx.com include:amazonses.com ~all"
TXT     _dmarc                 "v=DMARC1; p=quarantine; rua=mailto:admin@xsolut.ai"
CNAME   [dkim]._domainkey     [value-from-ses]
```

### Step 4: Test Configuration
```bash
# Test MX records
dig MX xsolut.ai

# Test email delivery
echo "Test email" | mail -s "Test" support@xsolut.ai
```

## Alternative: AWS WorkMail (Full Solution)
If you need calendar, contacts, and full email client:
1. AWS Console → WorkMail
2. Create organization
3. Add domain
4. $4/user/month

## Costs
- Domain: ~$80/year
- ImprovMX: Free (up to 25 forwards)
- AWS SES: $0.10 per 1000 emails
- Total: ~$7/month

## Support
For help with setup, contact AWS Support or refer to:
- https://docs.aws.amazon.com/ses/
- https://improvmx.com/docs