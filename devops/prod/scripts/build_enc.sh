cp ~/.ssh/kiliba-test ./devops/prod/secrets/private_key
tar cvf secrets.tar ./devops/prod/secrets/private_key ./devops/prod/secrets/.env
travis encrypt-file secrets.tar ./devops/prod/secrets/secrets.tar.enc --com
rm ./secrets.tar