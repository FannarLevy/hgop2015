##Vagrant
Lausn til að sjálfvirknivæða gerð umhverfis frá fyrirfram skilgreindri uppskrift. Einfaldar
uppsetningu á umhverfum og kemur í veg fyrir mismun á milli umhverfa.

##VirtualBox
Lausn til að keyra sýndartölvur. Gerir notendum kleif að keyra margar tölvur með
mismunandi stýrikerfum á einni tölvu. Þessar sýndartölvur er jafnframt hægt að
færa yfir á aðrar tölvur.

##Grunt
Lausn sem mikið er notuð við að þróun "front end" vefumhverfa. Grunt er "build"
kerfi sem sjálfvirknivæðir ýmsar aðgerðir sem þörf er á þróunarferlinu, til dæmis:
- Minnka javascript kóða fyrir dreifingu (e. minify)
- Tiltekt í kóðastrúktúr áður en kóði er notaður
- Staðfesta kóða útfrá forritunarreglum (e. linting)
- Sérsmíðaðar aðgerðir sem þörf er á fyrir viðkomandi kerfi

##npm
Lausn til að sækja javascript hugbúnaðarpakka. Mikið notað við hugbúnaðargerð þar
sem hægt er að afmarka kjarna forrits og notast við npm til að sækja viðbótarforrit
sem hugbúnaðurinn reiðir á útfrá fyrirfram skilgreindi pakkaskilgreiningu.

##nodejs
Lausn sem er byggð á javascript og nýtir atburði til að bregðast við aðstæðum sem keyrir kóða
hengdan á viðkomandi atburð (e. event callback). T.d. þegar netfyrirspurn kemur inn (vefþjónusta)
eða stýrikerfi klárar að sækja skrá frá skrárarkerfi.

##bower
Samskonar lausn og npm þar sem helsti munurinn liggur í því að npm sækir "dependant" pakka oft
fyrir hverja lausn og kemur þannig í veg fyrir árekstra á milli "dependencies". Bower notast
hinsvegar við flatan strúktúr sem mögulega þarf handvirkt þarf að stilla/lagfæra "dependencies"
á móti kemur að biðlarar þurfa ekki að sækja sama pakkan aftur og aftur.



##Íhlutir í notkun
Umhverfið okkar okkar samanstendur af þróunarumhverfi, prófunarumhverfi og raunumhverfi sem eru uppsett
sem VirtualBox sýndartölvur. Notast er við VirtualBox til að hýsa þessar sýndartölvur
á meðan Vagrant (sýndartölvuumsýslukerfi) er notað til að tengjast og stýra þessum sýndartölvum.
Hugbúnaðaðinum sjálfum er síðan pakkað í Docker gám. Þessir Docker gámar eru síðan hýstir á dockerhub
sem er hægt að keyra upp í prófunarumhverfinu okkar án þess að þurfa að hafa áhyggjur af óstöðugleika
í uppsetningu og keyrslu.



##Day 10 - traceability, production env, and deploy any version
**What does this give us?**
Getum dreift eldri útgáfum af hugbúnaðinum á einfaldan hátt

**Who would use the capability to track versions and why? Who would use capability to deploy any version and why?**
Þeir sem sjá um rekstur kerfisins geta tengt vandamál við ákveðna útgáfu og lagfært með því að
"revert" í seinustu stöðugu útgáfu.
Prófarar geta keyrt upp eldri útgáfur af kerfinu til að bera saman og staðfesta virkni á móti
nýjustu útgáfu.

**What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?**
Til að sama útgáfa skili sér rétt á öll umhverfi er rétt að build ferli skilgreini þetta aðeins einu sinni
til að tryggja samræmi milli umhverfa.

**How does the "deploy any version, anywhere" build feature work? Hint: Track GIT_COMMIT**
Hver breyting sem skilað er inn í samstæðustjórnunarkerfið fær úthlutað tætikóða (e. hash) sem notað er sem
einkvæmt auðkenni útgáfu. Docker útgáfa er jafnframt merkt (e. tag) með þessum einkvæma tætikóða.
Þennan einkvæma kóða er hægt að nota sem færibreytu í dreifingarferli sem sækir þá gögn sem tilheyra
viðkomandi útgáfu.


## Depolyment pipeline stages in jenkins

###Commit stage
```
#!/bin/sh

# To enable firefox running in grunt test
export DISPLAY=:0

# Build solution
# Make sure that we exit in case of an error
set -e
set -o pipefail

# Install required components
echo Installing required npm and bower components
npm install
bower install

# Create docker image
echo create a docker image
./dockerbuild.sh

echo "Done"
```

###Acceptance stage
```
#!/bin/bash

export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env

# Run deploy to test envrionment
cd ~/src/
./deploy.sh 192.168.33.20 TEST $GIT_COMMIT
```

###Production
```
#!/bin/bash

export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env

# Run deploy to production envrionment
cd ~/src/
./deploy.sh 192.168.33.30 PROD $GIT_COMMIT
```
