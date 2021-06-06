FILE="./.env"

if [[ $TRAVIS_BRANCH == 'develop' ]]; then
cat <<EOM >$FILE
NODE_ENV=production
SASS_PATH=node_modules
REACT_APP_AUTH_CONNECT_LOGIN_URL=https://auth-connect-dev.mybluemix.net/auth/login
REACT_APP_AUTH_CONNECT_LOGOUT_URL=https://auth-connect-dev.mybluemix.net/auth/logout
REACT_APP_API_BASE_URL=https://edge-starter-kit-dev.mybluemix.net/api
EOM
elif [[ $TRAVIS_BRANCH == 'stage' ]]; then
cat <<EOM >$FILE
NODE_ENV=production
SASS_PATH=node_modules
REACT_APP_AUTH_CONNECT_LOGIN_URL=https://auth-connect-stage.mybluemix.net/auth/login
REACT_APP_AUTH_CONNECT_LOGOUT_URL=https://auth-connect-stage.mybluemix.net/auth/logout
REACT_APP_API_BASE_URL=https://edge-starter-kit-stage.mybluemix.net/api
EOM
elif [[ $TRAVIS_BRANCH == 'production' ]]; then
cat <<EOM >$FILE
NODE_ENV=production
SASS_PATH=node_modules
REACT_APP_AUTH_CONNECT_LOGIN_URL=https://auth-connect.mybluemix.net/auth/login
REACT_APP_AUTH_CONNECT_LOGOUT_URL=https://auth-connect.mybluemix.net/auth/logout
REACT_APP_API_BASE_URL=https://edge-starter-kit.mybluemix.net/api
EOM
else
    exit 0
fi
