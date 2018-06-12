#!/bin/bash

if [ ! -f /etc/hosts.initial.backup ]; then
    echo "No initial backup found! Exiting..."
    exit 1
fi

sudo cp /etc/hosts /etc/hosts.`date --iso-8601=seconds`.backup
cat /etc/hosts.initial.backup $@ | sudo tee /etc/hosts.tmp
sudo mv /etc/hosts.tmp /etc/hosts -f
 
