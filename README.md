Site generate inside Hugo docker container
[Hugo docker](https://github.com/upthemedia/hugo_110)


#### Change user in order to have permission in the IDE: ####
```sh
su - hugo
```  
   
Si ya está creado el site entramos en el
```sh
cd <site-name>
```

#### To create new site: ####
```sh
hugo new site <site-name>
```

#### To create new theme: ####
```sh
hugo new theme <theme-name>
```

#### To create new content: ####
```sh
hugo new <content-type>/<content-name>.html
hugo new <content-type>/<content-name>.<language-code>.html
```

#### To develop: ####
```sh
hugo server 
# add -D to include draft content 
```

#### To build production: ####
```sh
## go to root user
exit
hugo --minify --cleanDestinationDir --environment production
```
