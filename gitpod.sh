sudo apt update -y
sudo apt upgrade -y
sudo apt install -y libsqlite3-dev libgc-dev
git clone https://github.com/vlang/v ~/v
cd ~/v
make
cd ..
sudo mv v /opt/v
sudo ln -sf /opt/v/v /usr/bin/v
cd /workspace/v-todo
v install
./build.sh
./v-todo &
cd app
npm install
npm run dev &
