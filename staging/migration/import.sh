#!/bin/bash
cat /usr/local/website/srv1/staging/migration/tmp.sql | mysql $1 $2 $3 $4
