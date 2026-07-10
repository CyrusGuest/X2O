#!/bin/bash

echo "🔄 Monitoring quota increase and will register xsolut.ai automatically..."
echo "Request ID: b964638f43714a0dba3d8a24607e9daeXt65r2IT"
echo ""

while true; do
    # Check quota
    CURRENT_QUOTA=$(aws service-quotas get-service-quota \
        --service-code route53 \
        --quota-code L-F767CB15 \
        --region us-east-1 \
        --query 'Quota.Value' \
        --output text 2>/dev/null)

    echo "$(date '+%H:%M:%S') - Current quota: $CURRENT_QUOTA"

    if [ "$CURRENT_QUOTA" = "25.0" ] || [ "$CURRENT_QUOTA" = "25" ]; then
        echo "✅ Quota increased! Registering xsolut.ai now..."

        aws route53domains register-domain \
            --domain-name xsolut.ai \
            --duration-in-years 2 \
            --auto-renew \
            --admin-contact file:///Users/cyrusguest/programming/X2O/domain-contact.json \
            --registrant-contact file:///Users/cyrusguest/programming/X2O/domain-contact.json \
            --tech-contact file:///Users/cyrusguest/programming/X2O/domain-contact.json \
            --privacy-protect-admin-contact \
            --privacy-protect-registrant-contact \
            --privacy-protect-tech-contact \
            --region us-east-1

        if [ $? -eq 0 ]; then
            echo "🎉 Domain registration initiated!"
            echo "Cost: ~$150 (2 years @ $75/year)"
            echo ""
            echo "Next steps:"
            echo "1. Domain will be active in 15-30 minutes"
            echo "2. Set up WorkMail at: https://us-east-1.console.aws.amazon.com/workmail/"
            echo "3. Create admin@xsolut.ai user"
            break
        fi
    fi

    sleep 30
done