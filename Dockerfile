FROM arm32v6/alpine

WORKDIR /root
RUN apk update &&\
  apk upgrade &&\
  apk --no-cache add \
    autoconf\
    automake\
    bash\
    curl\
    g++\
    git\
    htop\
    libtool\
    linux-headers\
    make\
    nodejs\
    npm\
    openssh\
    python\
    ruby\
    ruby-rake\
    sqlite\
    sqlite-dev\
    tmux\
    vim\
    yarn\
    zip\
    zlib-dev&&\
  git clone https://github.com/optgeo/cambridge

WORKDIR cambridge

