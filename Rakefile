def style(location) 
  sh({'LOCATION' => location},
    "parse-hocon style.conf > docs/style.json")
  sh "gl-style-validate docs/style.json"
end

namespace :style do
  desc 'build style.json for localhost'
  task :localhost do
    style('http://localhost')
  end

  desc 'build style.json for https://localhost'
  task :localhosts do
    style('https://localhost')
  end

  desc 'build style.json for raspberrypi.local'
  task :raspi do
    style('http://raspberrypi.local')
  end 

  desc 'build style.json for https://raspberrypi.local'
  task :raspis do
    style('https://raspberrypi.local')
  end
end

namespace :build do
  desc 'extract all tiles from mbtiles'
  task :tiles do
    sh "tile-join --force --no-tile-compression\
      --output-to-directory=docs/zxy\
      --no-tile-size-limit src/OS_Open_Zoomstack.mbtiles"
  end

  desc 'create self-signed certififcates'
  task :certs do
    sh "openssl genrsa 2048 > etc/cert.key"
    sh "openssl req -new -key etc/cert.key -subj \"/C=JP\" > etc/cert.csr"
    sh "openssl x509 -days 3650 -req -extfile etc/san.txt -signkey etc/cert.key < etc/cert.csr > etc/cert.pem"
  end
end

namespace :host do
  desc 'host the site using mbtiles'
  task :mbtiles do
    sh "node index.js"
  end

  desc 'host the site using raw tiles'
  task :tiles do
    sh "budo -d docs --port=80"
  end

  desc 'host the site using raw tiles via h2o'
  task :h2o do
    sh "h2o"
  end
end

namespace :docker do
  desc 'build Docker container image'
  task :build do
    sh "docker build -t unvt/cambridge docker"
  end

  desc 'run docker for cambridge'
  task :run do
    sh "docker run -ti --rm -v #{Dir.pwd}:/root/cambridge unvt/cambridge"
  end
end

desc 'create the whole environment on a raw Raspberry Pi.'
task :world do
  raise 'not implemented'
end

