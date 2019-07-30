#!/bin/bash
conf=$1;
root=$2
uid_status=$3;
/usr/local/bin/sncode -c $conf -d $root -uuid_status=$uid_status -f /module/sed/directmail/resource/transmit.sn > $root/module/sed/directmail/status/$uid_status.txt 2>&1
