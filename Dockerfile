FROM node:6.8.0

MAINTAINER team@breizhcamp.org

WORKDIR /work

ADD package.json /work/
RUN npm install

ADD .bowerrc /work/
ADD bower.json /work/
RUN npm install -g bower
RUN bower --allow-root install

ADD / /work

RUN ls -al node_modules
RUN ls -al bower_components
RUN npm install -g gulp
RUN gulp build

RUN mkdir /www
RUN mv /work/dist /www/scheduler

VOLUME /www/scheduler
CMD /bin/true
