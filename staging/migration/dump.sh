#!/bin/bash
mysqldump --skip-triggers $1 $2 $3 $4 $5 > /usr/local/website/srv1/staging/migration/tmp.sql
