cd android/app/src/main

if [ -d "res" ]; then
    rm -rf res
fi

if [ -d "res-nepal" ]; then
    mv res-nepal res
fi

cd ../..

echo "Diretório atual:"
pwd

echo "Listando arquivos no diretório atual:"
ls -l

sed -i "s/applicationId 'com.coachappnp'/applicationId 'com.coachappnp'/" build.gradle

