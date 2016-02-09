FROM monostream/nodejs-gulp-bower

WORKDIR /workplace
RUN git clone https://github.com/Okazari/schedit.git
WORKDIR /workplace/schedit
RUN npm install; exit 0
RUN bower install

CMD ["gulp", "serve"]
EXPOSE 3000
