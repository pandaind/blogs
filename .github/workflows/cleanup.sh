#!/bin/bash

echo "Starting to manage deployments in the $ENVIRONMENT_NAME environment of the $REPO_OWNER/$REPO_NAME repository..."

# Fetch all deployments and sort by creation time to find the latest one
DEPLOYMENTS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments?environment=$ENVIRONMENT_NAME" | \
    jq -r '[.[]] | sort_by(.created_at) | reverse | .[] | .id')

# Check if we have any deployments
if [ -z "$DEPLOYMENTS" ]; then
    echo "No deployments found in the $ENVIRONMENT_NAME environment."
else
    # Extract the most recent deployment ID
    LATEST_DEPLOYMENT=$(echo "$DEPLOYMENTS" | head -n 1)

    echo "Keeping the most recent deployment ID: $LATEST_DEPLOYMENT"

    # Loop through all deployments and delete all except the latest one
    for deployment_id in $DEPLOYMENTS; do
        if [ "$deployment_id" != "$LATEST_DEPLOYMENT" ]; then
            echo "Deleting deployment with ID: $deployment_id"
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE -H "Authorization: token $GITHUB_TOKEN" \
                "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments/$deployment_id")

            if [ "$RESPONSE" -eq 204 ]; then
                echo "Successfully deleted deployment ID: $deployment_id"
            else
                echo "Failed to delete deployment ID: $deployment_id with HTTP response $RESPONSE"
            fi
        else
            echo "Skipping most recent deployment ID: $deployment_id"
        fi
    done
fi

echo "Finished managing deployments in the $ENVIRONMENT_NAME environment."
