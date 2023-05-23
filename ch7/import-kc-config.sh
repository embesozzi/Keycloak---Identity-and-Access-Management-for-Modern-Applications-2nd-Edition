#!/bin/bash

cat <<EOF | docker exec --interactive iam-ch7-keycloak sh
/opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8180 --realm master --user admin --password password
/opt/keycloak/bin/kcadm.sh create realms -s realm=myrealm -s enabled=true -o
/opt/keycloak/bin/kcadm.sh create clients -r myrealm -s clientId=mybrowserapp -s publicClient=true -s 'redirectUris=["http://localhost:8080/*"]' -s 'webOrigins=["http://localhost:8080"]' -s baseUrl="http://localhost:8080" -o
/opt/keycloak/bin/kcadm.sh create clients -r myrealm -s clientId=mywebapp -s 'redirectUris=["http://localhost:8080/*"]' -s baseUrl="http://localhost:8080" -o
/opt/keycloak/bin/kcadm.sh create clients -r myrealm -s clientId=mybackend -s standardFlowEnabled=true -s directAccessGrantsEnabled=true -o
/opt/keycloak/bin/kcadm.sh create clients -r myrealm -s clientId=proxy-client -s standardFlowEnabled=true -o
/opt/keycloak/bin/kcadm.sh create users -r myrealm -s username=alice -s enabled=true
/opt/keycloak/bin/kcadm.sh set-password -r myrealm --username alice --new-password alice
EOF