
# GoodTube

Hello and welcome! I'm glad you're here.

What is GoodTube you ask? It's a little plugin for Youtube (just works) and;

- REMOVES 100% OF PAGE AND VIDEO ADS.
- Allows background play (so you can turn your phone screen off and keep listening).
- Allows you to download the audio / video / entire playlist in up to 8K quality with the click of a button (at the bottom of the player).
- Works on both desktop and mobile (iOS and Android).
- Works in all major browsers (Chrome, Firefox, Opera, etc).
- Proxies in Youtube videos from different servers (in up to 8k quality).
- Removes shorts.
- Removes unwanted search results ("You might also like this", "Other people also watched", etc).
- Removes thumbnails for other recommended videos that pop up when a video finishes (I really hate these, try without it's nice).
- Keeps you up to date with the latest version automatically.

And it keeps the good stuff like;

- The beloved algorithm / watch history.
- Keyboard shortcuts.
- Subtitles.
- Chapters.
- Autoplay.
- Playlists.
- Picture in picture / the miniplayer.
- Theater mode.
- Live streams.

It's easy to install too;

 - [How to install on desktop](#how-to-install-on-desktop)
 - [How to install on Android (mobile)](#how-to-install-on-android-mobile)
 - [How to install on iOS / iPhone (mobile)](#how-to-install-on-ios--iphone-mobile)

Here's some screenshots;
|  ![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/demo-desktop.png)|  ![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/demo-mobile.png)|
|--|--|

## How to install on Desktop

1. Disable your other adblockers! You can do this for Youtube only.


2. Install this browser extension "Tampermonkey":

https://www.tampermonkey.net/


3. Once that's done, simply click on this link and press "Install":

https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js

4. If you're using CHROME

You need to turn on developer mode for this extension. Check out the screenshots below for instructions.

![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/chrome.png)


5. If you're using FIREFOX

You need to enable autoplay. Check out the screenshot below for instructions.

![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/firefox.png)


That's it. You're good to go. Open up Youtube and happy days.


## How to install on Android (mobile)

This will take you a few minutes, because mobiles are generally sort of annoying...

Just follow the steps below and I promise it'll work for you! :)

1. First off you'll need to install this app called "Firefox Nightly". You can find it on Google Play.
(Basically it's an official release of Firefox, but it also allows you to install browser extensions.)

**Pro tip - I've recently discovered that you can also install extensions on normal Firefox, so you may not need to download Firefox Nightly! Other than that, the steps are the same.**


2. Once it's installed, open Firefox Nightly.
Now click the 3 dots down the bottom right, and go to "Settings":

![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/android-1.png)


3. Scroll down and go to "Extensions":

![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/android-2.png)


4. Add the extension "Tampermonkey":

![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/android-3.png)


5. Now go back to the main screen of Firefox Nightly (just hit back back back until you're there).

6. Then go to the following webpage:
https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js


7. Click "Install":

![enter image description here](https://raw.githubusercontent.com/goodtube4u/goodtube/main/installation/android-4.png)


**That's it. You're good to go. Open up Youtube in Firefox Nightly and happy days!!**

I recommend using Firefox Nightly just like you would the Youtube app. Put it on your home screen somewhere / make Youtube the homepage for an even smoother experience :)

*Please note: If you see a mostly blank screen on the Youtube homepage, don't worry! This is normal. Just search for something.*

*Simply sign into Youtube and the homepage will be full of your favorite videos once again.*


## How to install on iOS / iPhone (mobile)

This will take you a few minutes, because mobiles are generally sort of annoying...

Just follow the steps below and I promise it'll work for you! :)

1. First off you'll need to install this app called "Orion Browser". You can find it on the App Store. (Basically it's an alternative browser that allows you to install browser extensions.)

2. Once it's installed, open Orion Browser.

3. Go to Extensions.

4. Install an extension called "Violentmonkey" (do NOT try and use Tampermonkey instead, it doesn't work for iOS).

5. Now go to the following webpage: https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js

6. Click "Install" on the page the pops up.


**That's it. You're good to go. Open up Youtube in Orion Browser and happy days!!**

I recommend using Orion Browser just like you would the Youtube app. Put it on your home screen somewhere / make Youtube the homepage for an even smoother experience :)

*Please note: If you see a mostly blank screen on the Youtube homepage, don't worry! This is normal. Just search for something.*

*Simply sign into Youtube and the homepage will be full of your favorite videos once again.*


## Why?
Well lately I've been raging as Youtube have successfully stopped most adblockers from working (or they only work sometimes). You've probably been experiencing this same nightmare on and off.

I'm a programmer by trade so decided to try and fix this for everyone.

I'll never pay a company that is slapping ads on one of the largest archives of music / film / art in the world and blackmailing me to remove them. They really have a social responsibility that isn't being taken seriously...

So anyway, screw em. Install this little plugin and enjoy no ads 🎉

This took around 5 weeks to create and a thousand black coffees. I do hope you enjoy it.

Any questions, you can contact me at: goodtube4u@hotmail.com

I'm dedicated to helping every single user get this working, so really - if you have any problems at all hit me up!


## Attributions

Many thanks to https://cobalt.tools for providing the amazing API we're using to download stuff!

You can also use this website to download from other platforms like SoundCloud, give it a try :)


## (Optional) Host your own local video server - to make this load videos FAST!

- This is for advanced users only.
- This is not for phones. You can only do this on a desktop computer (Windows, Mac and Linux are all supported).
- Doing this will significantly speed up GoodTube! You should get normal Youtube speed or very close to.


**Here's how you do it:**

1. Install Docker Desktop (https://www.docker.com/products/docker-desktop/)

2. Install Git (https://git-scm.com/downloads)

3. Open Terminal / Command Prompt and enter the following commands
```
cd c:/
git clone https://github.com/iv-org/invidious.git
```

4. Edit the following file in a text editor like Notepad:
`c:/invidious/docker-compose.yml`

5. Delete all the code in there and replace it with:
```
version: "3"
services:

  invidious:
    image: quay.io/invidious/invidious:latest
    # image: quay.io/invidious/invidious:latest-arm64 # ARM64/AArch64 devices
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      # Please read the following file for a comprehensive list of all available
      # configuration options and their associated syntax:
      # https://github.com/iv-org/invidious/blob/master/config/config.example.yml
      INVIDIOUS_CONFIG: |
        db:
          dbname: invidious
          user: kemal
          password: kemal
          host: invidious-db
          port: 5432
        check_tables: true
        # external_port:
        # domain:
        # https_only: false
        # statistics_enabled: false
        hmac_key: "goodtube4u"
    healthcheck:
      test: wget -nv --tries=1 --spider http://127.0.0.1:3000/api/v1/trending || exit 1
      interval: 30s
      timeout: 5s
      retries: 2
    logging:
      options:
        max-size: "1G"
        max-file: "4"
    depends_on:
      - invidious-db

  invidious-db:
    image: docker.io/library/postgres:14
    restart: unless-stopped
    volumes:
      - postgresdata:/var/lib/postgresql/data
      - ./config/sql:/config/sql
      - ./docker/init-invidious-db.sh:/docker-entrypoint-initdb.d/init-invidious-db.sh
    environment:
      POSTGRES_DB: invidious
      POSTGRES_USER: kemal
      POSTGRES_PASSWORD: kemal
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]

volumes:
  postgresdata:

```

6. Open Terminal / Command Prompt and enter the following commands
```
cd c:/invidious
docker-compose up
```

7. Let it run for a few minutes, you'll see a bunch of text appearing while it installs everything. Eventually it will stop outputting text and you can close Terminal / Command Prompt.

8. Open Docker Desktop.

9. On the "Containers" tab you will see a thing called "Invidious". Press the play arrow to start it.

10. Check it's working by going to http://127.0.0.1:3000 in your browser. If you see an instance of Invidious you're good to go!

11. Now that's done, go to https://www.youtube.com/?goodtube_local=true in your browser to enable the local server. You only need to do this once, the setting will be remembered.

12. Now you can visit Youtube like normal, but at the top of the "Video Source" list you will see a server called "LOCAL". This is your local video server, recommended you select the "Automatic" mode from the video servers list. This will try your local server first, and if that fails, fallback to using the normal servers.

13. As long as you've got your Invidious instance running in Docker Desktop, then this local video server will work and should be SUPER FAST. Enjoy :)

Note: If you want to turn this off, go to https://www.youtube.com/?goodtube_local=false in your browser. You only need to do this once, the setting will be remembered.


## (Optional) Add custom video servers

- This is for advanced users only.
- It allows you to add your own video servers to the list.
- If you're hosting your own video server as per the above instructions, but need to change the web address or settings, this provides an easy way to do that.

**To add a custom video server**

Visit `https://www.youtube.com` with the following GET params:

```
goodtube_customserver_0_name=My custom server
goodtube_customserver_0_type=2
goodtube_customserver_0_proxy=true
goodtube_customserver_0_url=https://mycustomserver.com
```

For example:

`https://www.youtube.com?goodtube_customserver_0_name=My custom server&goodtube_customserver_0_type=2&goodtube_customserver_0_proxy=true&goodtube_customserver_0_url=https://myawesomeserver.com`

You can do this for up to 10 servers. Just change the `0` to `1`, `2`, `3` and so on. Example:

`goodtube_customserver_0_name` is the first server

`goodtube_customserver_1_name` is the second server


You only need to do this once. It will remember the setting until you disable it.


**To remove a custom video server**

Visit `https://www.youtube.com` with the following GET param:

`https://www.youtube.com?goodtube_customserver_0=false`


**Server options**

Name (goodtube_customserver_XXX_name):

```
The name of the server
```

Type (goodtube_customserver_XXX_type):

```
1 = Invidious, 360p only
2 = Invidious, DASH stream - all qualities
3 = Piped - all qualities
```

Proxy (goodtube_customserver_XXX_proxy):

```
true = Proxy all video traffic through the server (recommended)
false = Do NOT proxy traffic through the server (not recommended)
```

URL (goodtube_customserver_XXX_url):

```
The web address of the server. Make sure this does not have a trailing slash. For example:
https://myawesomeserver.com
```

**PLEASE NOTE**:

Custom video servers MUST be served over `https` instead of `http`. You can only use `http` if the web address is local, eg `http://127.0.0.1` (using any port you like, eg `:3000`).
