#!/bin/bash -x

if [ ! -f /etc/hosts.initial.backup ]; then
    echo "No initial backup found! Creating one..."
    sudo cp /etc/hosts /etc/hosts.initial.backup
    echo "Backup file created."
fi

sudo cp /etc/hosts /etc/hosts.`date --iso-8601=seconds`.backup
cat /etc/hosts.initial.backup $@ | tr -d '\r' | grep -v whatsapp | sudo tee /etc/hosts.tmp >/dev/null
sudo mv /etc/hosts.tmp /etc/hosts -f
 
