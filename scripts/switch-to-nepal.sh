#!/bin/bash

# Navega até o diretório do projeto Android
cd android/app/src/main

# Renomeia a pasta 'res' para 'res-sl'
if [ -d "res" ]; then
    mv res res-sl
fi

# Renomeia a pasta 'res-nepal' para 'res'
if [ -d "res-nepal" ]; then
    mv res-nepal res
fi

# Navega para o diretório raiz do projeto Android
cd ../..

echo "Diretório atual:"
pwd

echo "Listando arquivos no diretório atual:"
ls -l

# Substitui a string no arquivo build.gradle
# Utiliza o comando sed para a substituição
sed -i '' "s/applicationId 'com.coachappsl'/applicationId 'com.coachappnp'/" build.gradle

