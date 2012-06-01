#!/bin/bash

# livevent(use memcached)
tar zxvf libevent-2.0.19-stable.tar.gz
cd libevent-2.0.19-stable
./configure
make
sudo make install

cd ../

# memcached
tar zxvf memcached-1.4.13.tar.gz
cd memcached-1.4.13
./configure
make
sudo make install

echo " "
echo " "
echo "#######################################"
echo " "
echo "please command execute 'memcached -d -m 64 -p 11211'"
