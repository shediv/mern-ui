#!/bin/bash

# verify that the required Cloud Foundry variables are set
invocation_error=0

# - BXIAM: IBM Cloud API key
if [ -z ${BXIAM+x} ]; then echo 'Error: Environment variable BXIAM is undefined.'; invocation_error=1; fi
# - CF_ORGANIZATION: IBM Cloud/Cloud Foundry organization name
if [ -z ${CF_ORGANIZATION+x} ]; then echo 'Error: Environment variable CF_ORGANIZATION is undefined.'; invocation_error=1; fi
# - CF_SPACE: IBM Cloud/Cloud Foundry space name
if [ -z ${CF_SPACE+x} ]; then echo 'Error: Environment variable CF_SPACE is undefined.'; invocation_error=1; fi

# set optional Cloud Foundry variables if they are not set
# - CF_API: IBM Cloud API endpoint (default to US-South region)
if [ -z ${CF_API+x} ]; then export CF_API='https://api.us-south.cf.cloud.ibm.com'; fi

if [ ${invocation_error} -eq 1 ]; then echo 'Something went wrong, check for previous errors.'; exit 1; fi

APP_NAME="";
case "$TRAVIS_BRANCH" in
develop)
        echo "Develop branch detected";
        APP_NAME="${APPNAME_DEVELOP}"
        ;;
stage)
        echo "Stage branch detected";
        APP_NAME="${APPNAME_STAGE}"
        ;;
production)
        echo "Production branch detected"
        APP_NAME="${APPNAME_PRODUCTION}"
        ;;
*)
      echo "Don't know how to handle this request"
      exit 1 # Command to come out of the program with status 1
      ;;
esac

cd "$TRAVIS_BUILD_DIR"
mv build nginx/public
cd nginx

# login to ibmcloud using APIKEY
echo "## Login into IBM Cloud..";
cf login -a ${CF_API} -u apikey -p "${BXIAM}" -o "${CF_ORGANIZATION}" -s "${CF_SPACE}";

echo "## Deploying application..branch: ${TRAVIS_BRANCH},  app_name:${APP_NAME}";

cf push "$APP_NAME" -t 600 -b https://github.com/cloudfoundry/nginx-buildpack.git