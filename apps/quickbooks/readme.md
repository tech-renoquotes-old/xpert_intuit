# Intuit Xpertapp

## Description
A simple  quickbooks API that that transfers invoices to quickbooks. In this project, the quickbook SDK is used.

## Installation
Requires nodejs 11 + to be installed
- curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
- sudo yum install nodejs

## starting the application
the quickbooks application is listening from localhost on port 8002. All public requests to xs.apps.xpertsource.com need to be redirected to localhost:8002
To start the application, go through the steps below:
1- navigate to the root of application /usr/local/website/xpertv1/apps
2- check if any other instance of the application is running: ps -ef | grep xpertapp.js
3- use nohup to silently start the application with npm start command: nohup npm start &
4- Check log file /usr/local/website/xpertv1/nohup.out to see the result: cat /usr/local/website/xpertv1/nohup.out
6- Open xs.apps.xpertsource.com in a browser. It should display the quickbooks application interface.

