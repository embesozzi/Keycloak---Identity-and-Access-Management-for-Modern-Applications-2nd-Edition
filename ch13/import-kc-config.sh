#!/bin/bash

cat <<EOF | docker exec --interactive iam-ch13-keycloak sh
/opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080 --realm master --user admin --password password
/opt/keycloak/bin/kcadm.sh create realms -s realm=myrealm -s enabled=true -o
/opt/keycloak/bin/kcadm.sh create users -r myrealm -s username=alice -s enabled=true
/opt/keycloak/bin/kcadm.sh set-password -r myrealm --username alice --new-password alice
EOF