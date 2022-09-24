#!/bin/bash -x

CURRENT_DATETIME="$(date --iso-8601=seconds)"

if [ ! -f /etc/hosts.initial.backup ]; then
    echo "No initial backup found! Creating one..."
    sudo cp /etc/hosts "/etc/hosts.initial.backup"
    echo "Backup file created."
fi

sudo cp /etc/hosts "/etc/hosts.$CURRENT_DATETIME.backup"
cat /etc/hosts.initial.backup <(cat $@ | grep -E '^(127.0.0.1|\s*#|0.0.0.0)') | tr -d '\r' | sudo tee /etc/hosts.tmp >/dev/null
sudo mv /etc/hosts.tmp /etc/hosts -f
 
