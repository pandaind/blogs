#!/bin/bash

echo "Starting to deactivate and delete deployments from the $ENVIRONMENT_NAME environment in the $REPO_OWNER/$REPO_NAME repository..."

# Get the list of deployments for the github-pages environment
DEPLOYMENTS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments?environment=$ENVIRONMENT_NAME" | jq -r '.[].id')

if [ -z "$DEPLOYMENTS" ]; then
    echo "No deployments found in the $ENVIRONMENT_NAME environment."
else
    echo "Found the following deployments to deactivate and delete: $DEPLOYMENTS"
    # Deactivate and delete each deployment
    for deployment_id in $DEPLOYMENTS; do
        echo "Deactivating deployment with ID: $deployment_id"

        # Attempt to deactivate deployment by posting a status
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments/$deployment_id/statuses" \
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
    done
fi

echo "Finished deactivating and deleting deployments from the $ENVIRONMENT_NAME environment."
