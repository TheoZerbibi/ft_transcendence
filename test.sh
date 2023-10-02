#!/bin/bash

# while [[ "1" != [123] ]] ; do echo "Choix non valide." ; read -n 1 user_choice ; done
# read -n 1 user_choice
while [[ ! "4" =~ [1-3] ]] ; do echo "Choix non valide." ; read -n 1 user_choice ; done


