# AWS Complete Email Setup for xsolut.ai

## Total Cost: ~$12/month + $75/year domain
- Route 53 Domain: $75/year
- WorkMail: $4/user/month (3 users = $12/month)

## Step 1: Register Domain in Route 53

1. Go to AWS Console → Route 53
2. Click "Register Domain"
3. Search for "xsolut.ai"
4. Add to cart and complete purchase (~$75)
5. Route 53 automatically creates a hosted zone

## Step 2: Set Up AWS WorkMail

### Create WorkMail Organization
```bash
# Via AWS CLI (optional)
aws workmail create-organization \
  --alias xsolut \
  --domains "xsolut.ai" \
  --region us-east-1
```

Or via Console:
1. AWS Console → WorkMail
2. Click "Create organization"
3. Choose "Quick setup"
4. Organization alias: `xsolut`
5. Region: US East (Virginia) - best for email
6. Click "Create"

### Add Your Domain
1. In WorkMail → Organizations → xsolut
2. Go to "Domains" tab
3. Click "Add domain"
4. Enter: `xsolut.ai`
5. WorkMail will provide DNS records

### Configure DNS in Route 53
WorkMail will give you these records - add them in Route 53:

```
# MX Record (Email Routing)
Type: MX
Name: @
Value: 10 inbound-smtp.us-east-1.amazonaws.com

# SPF Record (Sender Verification)
Type: TXT
Name: @
Value: "v=spf1 include:amazonses.com ~all"

# DKIM Records (Email Authentication)
Type: CNAME
Name: [provided]._domainkey
Value: [provided].dkim.amazonses.com

# Autodiscover (Email Client Setup)
Type: CNAME
Name: autodiscover
Value: autodiscover.mail.us-east-1.awsapps.com
```

### Create Email Users

1. In WorkMail → Organizations → xsolut → Users
2. Create 3 users:

**User 1: Support**
- Username: `support`
- Email: `support@xsolut.ai`
- Display Name: "XSolut Support"
- Password: [generate secure password]

**User 2: Help**
- Username: `help`
- Email: `help@xsolut.ai`
- Display Name: "XSolut Help"
- Password: [generate secure password]

**User 3: Admin**
- Username: `admin`
- Email: `admin@xsolut.ai`
- Display Name: "XSolut Admin"
- Password: [generate secure password]

### Optional: Create Email Aliases (Free)
Instead of separate users, you can create aliases that forward to one main account:

1. Create 1 main user: `admin@xsolut.ai`
2. Add aliases:
   - support@ → admin@
   - help@ → admin@
   - hello@ → admin@
   - info@ → admin@

This way you only pay for 1 user ($4/month) but have multiple email addresses!

## Step 3: Access Your Email

### Web Interface
- URL: https://xsolut.awsapps.com/mail
- Login with username and password

### Email Clients (Outlook, Apple Mail, etc.)
**IMAP Settings:**
- Server: imap.mail.us-east-1.awsapps.com
- Port: 993
- Security: SSL/TLS

**SMTP Settings:**
- Server: smtp.mail.us-east-1.awsapps.com
- Port: 465
- Security: SSL/TLS

### Mobile Apps
- Download "Amazon WorkMail" app
- Organization: xsolut
- Username: your email
- Password: your password

## Step 4: Advanced Features (Included)

### Email Rules & Filtering
1. WorkMail console → Rules
2. Create rules for:
   - Auto-responses
   - Forwarding
   - Folder organization

### Shared Mailboxes (Optional)
Create shared mailboxes like:
- sales@xsolut.ai (shared by team)
- investors@xsolut.ai (shared by founders)

### Integration with AWS Services
- **SES**: For bulk/transactional emails
- **Lambda**: For email processing
- **S3**: For attachment storage

## Step 5: Security Best Practices

### Enable MFA
1. WorkMail → Organization settings
2. Enable "Multi-factor authentication"
3. Require for all users

### Set Password Policy
1. WorkMail → Organization settings → Password policy
2. Set minimum requirements:
   - 12+ characters
   - Mixed case, numbers, symbols
   - Rotation every 90 days

### Email Retention
1. WorkMail → Organization settings → Retention
2. Set email retention period (default: unlimited)

## Testing Your Setup

```bash
# Test MX records
dig MX xsolut.ai

# Should return:
# xsolut.ai.  300  IN  MX  10 inbound-smtp.us-east-1.amazonaws.com

# Test email delivery
echo "Test email body" | mail -s "Test Subject" support@xsolut.ai
```

## Cost Optimization Tips

### Option 1: Minimal Setup ($4/month)
- 1 WorkMail user (admin@)
- Multiple aliases (support@, help@, etc.)
- All emails go to one inbox

### Option 2: Standard Setup ($8/month)
- 2 WorkMail users
- admin@ for internal
- support@ for customer-facing

### Option 3: Full Setup ($12/month)
- 3 WorkMail users
- Separate inboxes for support, help, admin
- Better organization and delegation

## Support & Documentation

- AWS WorkMail Documentation: https://docs.aws.amazon.com/workmail/
- AWS Support: Available through AWS Console
- Common Issues: https://docs.aws.amazon.com/workmail/latest/adminguide/troubleshooting.html

## Next Steps

1. Register xsolut.ai in Route 53
2. Set up WorkMail organization
3. Add domain and configure DNS
4. Create users/aliases
5. Test email sending/receiving
6. Configure email clients
7. Set up security (MFA, password policy)

---

Note: WorkMail includes 50GB storage per user, calendar, contacts, and mobile sync - everything you need for professional email.