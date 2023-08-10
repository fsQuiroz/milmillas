yarn build
zip -r app.zip dist
scp app.zip frani@fsquiroz.com:~/mm.zip
rm app.zip
rm -rf dist

ssh fsquiroz bash /home/frani/deploy-mm
