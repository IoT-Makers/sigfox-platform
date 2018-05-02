#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
if [ $# -ne 3 ]
  then
    echo "${red}Please provide 3 arguments (app name, amount of web processes, datasource URI)${reset}"
else
  APP_NAME=$1
  WEB_PROCESSES=$2
  DB_URI=$3
  echo "${green}----------------------------- Setting restart policy to always ------------------${reset}"
  sudo dokku ps:set-restart-policy $APP_NAME always
  echo "${green}----------------------------- Setting DB URI ------------------------------------${reset}"
  sudo dokku config:set --no-restart $APP_NAME MONGODB_URI=$DB_URI
  echo "${green}----------------------------- Setting letsencrypt -------------------------------${reset}"
  sudo dokku config:set --no-restart $APP_NAME DOKKU_LETSENCRYPT_EMAIL=antoinedechassey@gmail.com
  echo "${green}----------------------------- Setting web processes -----------------------------${reset}"
  sudo dokku ps:scale $APP_NAME web=$WEB_PROCESSES
  echo "${green}----------------------------- Letsencrypt ---------------------------------------${reset}"
  sudo dokku letsencrypt $APP_NAME
  echo "${green}----------------------------- Done app configuration :) -------------------------${reset}"
fi
