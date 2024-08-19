#!/bin/bash

echo "Starting to deactivate and delete deployments from the $ENVIRONMENT_NAME environment in the $REPO_OWNER/$REPO_NAME repository..."

# Get the list of deployments for the github-pages environment
DEPLOYMENTS=$(curl -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments?environment=$ENVIRONMENT_NAME" \
    2>/dev/null | jq -r '.[].id')

if [ -z "$DEPLOYMENTS" ]; then
    echo "No deployments found in the $ENVIRONMENT_NAME environment."
else
    echo "Found the following deployments to deactivate and delete: $DEPLOYMENTS"
    # Deactivate and delete each deployment
    for deployment_id in $DEPLOYMENTS; do
        echo "Deactivating deployment with ID: $deployment_id"
        
        # Deactivate the deployment
        STATUS_URL=$(curl -H "Authorization: token $GITHUB_TOKEN" \
            "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments/$deployment_id/statuses" \
            2>/dev/null | jq -r '.[0].url')

        curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            $STATUS_URL \
            -d '{"state":"inactive"}'

        if [ $? -eq 0 ]; then
            echo "Successfully deactivated deployment ID: $deployment_id"
        else
            echo "Failed to deactivate deployment ID: $deployment_id"
            continue
        fi

        echo "Deleting deployment with ID: $deployment_id"
        curl -X DELETE -H "Authorization: token $GITHUB_TOKEN" \
            "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/deployments/$deployment_id"

        if [ $? -eq 0 ]; then
            echo "Successfully deleted deployment ID: $deployment_id"
        else
            echo "Failed to delete deployment ID: $deployment_id"
        fi
    done
fi

echo "Finished deactivating and deleting deployments from the $ENVIRONMENT_NAME environment."
