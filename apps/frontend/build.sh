#!/bin/bash
npm run generate:production
IMAGE=rachoon-frontend
REPO=adisdurakovic/$IMAGE
VERSION=$(npm version minor)
git add package.json
git commit -am 'Bump version $VERSION'
docker login -u adisdurakovic -p adoapril
docker build -t $IMAGE:latest -t $IMAGE:$VERSION -t $REPO:latest -t $REPO:$VERSION .
docker tag $IMAGE:latest $REPO:latest
docker tag $IMAGE:$VERSION $REPO:$VERSION
docker push $REPO:latest
docker push $REPO:$VERSION
# caprover deploy -h https://captain.apps.dnmc.in -i adisdurakovic/rachoon-frontend:$VERSION -a rachoon -p AdisAdonis123! 