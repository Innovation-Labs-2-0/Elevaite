#!/bin/bash
PROJECT_ID="innovait-jade"
REGION="us-central1"
REPO_NAME="elevaite-repo"
SERVICE_NAME="elevaite-backend"
CUSTOM_SA="elevaite-hub-admin@$PROJECT_ID.iam.gserviceaccount.com"
IMAGE_NAME="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/backend:latest"

# 1. Build
gcloud builds submit --tag $IMAGE_NAME

# 2. Deploy with longer timeout
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --service-account=$CUSTOM_SA \
    --set-env-vars="DATABASE_NAME=elevaite_prod" \
    --set-secrets="MONGODB_URL=MONGODB_URL:latest" \
    --memory 512Mi \
    --cpu 1 \
    --timeout 300