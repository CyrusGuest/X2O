#!/usr/bin/env python3
import boto3
from datetime import datetime

# Create SES client
ses = boto3.client('ses', region_name='us-east-1')

# Send test email
def send_test_email():
    response = ses.send_email(
        Source='support@xsolut.ai',
        Destination={
            'ToAddresses': ['cyrus.t.guest@gmail.com']
        },
        Message={
            'Subject': {
                'Data': '🎉 xsolut.ai Email System is Live!',
                'Charset': 'UTF-8'
            },
            'Body': {
                'Html': {
                    'Data': '''
                    <html>
                        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
                                <h1 style="margin: 0;">xsolut.ai Email is Live! 🚀</h1>
                            </div>

                            <div style="padding: 30px; background: #f7f7f7; margin-top: 20px; border-radius: 10px;">
                                <h2>Your Professional Email Setup is Complete</h2>
                                <p>This email was sent from <strong>support@xsolut.ai</strong> using AWS SES.</p>

                                <h3>✅ What's Working:</h3>
                                <ul>
                                    <li>Domain: xsolut.ai</li>
                                    <li>Sending: AWS SES</li>
                                    <li>Receiving: ImprovMX → Gmail</li>
                                    <li>SPF, DKIM, DMARC: All configured</li>
                                </ul>

                                <h3>📧 Your Email Addresses:</h3>
                                <ul>
                                    <li>admin@xsolut.ai</li>
                                    <li>support@xsolut.ai</li>
                                    <li>help@xsolut.ai</li>
                                    <li>hello@xsolut.ai</li>
                                    <li>info@xsolut.ai</li>
                                </ul>

                                <p style="margin-top: 30px; padding: 15px; background: white; border-left: 4px solid #667eea;">
                                    <strong>Next Steps:</strong><br>
                                    1. Reply to this email to test receiving<br>
                                    2. Set up email signatures in Gmail<br>
                                    3. Configure "Send as" in Gmail settings
                                </p>

                                <p style="text-align: center; color: #888; margin-top: 30px;">
                                    Sent on ''' + datetime.now().strftime('%B %d, %Y at %I:%M %p') + '''
                                </p>
                            </div>
                        </body>
                    </html>
                    ''',
                    'Charset': 'UTF-8'
                }
            }
        }
    )
    return response

if __name__ == '__main__':
    try:
        result = send_test_email()
        print("✅ Test email sent successfully!")
        print(f"Message ID: {result['MessageId']}")
    except Exception as e:
        print(f"❌ Error: {e}")