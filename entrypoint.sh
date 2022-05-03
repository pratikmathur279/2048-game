cd ./node_modules

echo "downloading"
apt update

echo "downloading 7zip"
apt install p7zip-full

echo "Preparing files for job execution"

# 7z e node_modules.zip
# unzip node_modules.zip