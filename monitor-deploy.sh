#!/bin/bash

echo "Monitoring Amplify deployment (Job ID: 5)..."

for i in {1..20}; do
  STATUS=$(aws amplify get-job --app-id d1558u2gm4b8kl --branch-name main --job-id 5 --region us-east-1 2>/dev/null | jq -r '.job.summary.status')
  echo "Attempt $i: Status = $STATUS"

  if [ "$STATUS" = "SUCCEED" ]; then
    echo "✅ Deployment successful!"
    DOMAIN=$(aws amplify get-app --app-id d1558u2gm4b8kl --region us-east-1 2>/dev/null | jq -r '.app.defaultDomain')
    echo "🌐 App URL: https://main.$DOMAIN"
    exit 0
  elif [ "$STATUS" = "FAILED" ]; then
    echo "❌ Deployment failed!"
    exit 1
  fi

  sleep 15
done

echo "⏱️  Deployment still in progress after 5 minutes..."