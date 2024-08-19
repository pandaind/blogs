#!/bin/bash

echo "Starting to manage deployments in the $ENVIRONMENT_NAME environment of the $REPO_OWNER/$REPO_NAME repository..."

# Get the list of deployments for the environment
DEPLOYMENTS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments?environment=$ENVIRONMENT_NAME" | jq -r '.[] | select(.status == "active") | .id')

if [ -z "$DEPLOYMENTS" ]; then
    echo "No active deployments found in the $ENVIRONMENT_NAME environment."
else
    # Determine the most recent deployment (assuming deployments are ordered by creation time)
    LATEST_DEPLOYMENT=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments?environment=$ENVIRONMENT_NAME" | jq -r '.[] | select(.status == "active") | .id' | head -n 1)

    echo "Keeping the most recent active deployment ID: $LATEST_DEPLOYMENT"

    # Deactivate and delete all deployments except the most recent active one
    for deployment_id in $DEPLOYMENTS; do
        if [ "$deployment_id" != "$LATEST_DEPLOYMENT" ]; then
            echo "Deactivating deployment with ID: $deployment_id"

            # Attempt to deactivate deployment by posting a status
            STATUS_URL=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments/$deployment_id/statuses" | jq -r '.[0].url')

            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Authorization: token $GITHUB_TOKEN" \
                -H "Accept: application/vnd.github.v3+json" \
                $STATUS_URL \
                -d '{"state":"inactive"}')

            if [ "$RESPONSE" -eq 201 ]; then
                echo "Successfully deactivated deployment ID: $deployment_id"
            else
                echo "Failed to deactivate deployment ID: $deployment_id with HTTP response $RESPONSE"
                continue
            fi

            echo "Deleting deployment with ID: $deployment_id"
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE -H "Authorization: token $GITHUB_TOKEN" \
                "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments/$deployment_id")

            if [ "$RESPONSE" -eq 204 ]; then
                echo "Successfully deleted deployment ID: $deployment_id"
            else
                echo "Failed to delete deployment ID: $deployment_id with HTTP response $RESPONSE"
            fi
        else
            echo "Skipping most recent active deployment ID: $deployment_id"
        fi
    done
fi

echo "Finished managing deployments in the $ENVIRONMENT_NAME environment."
