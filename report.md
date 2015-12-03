##Íhlutir í notkun
Umhverfið okkar okkar samanstendur af þróunarumhverfi og prófunarumhverfi sem eru bæði uppsett
sem VirtualBox sýndartölvur. Notast er við VirtualBox til að hýsa þessar sýndartölvur
á meðan Vagrant (sýndartölvuumsýslukerfi) er notað til að tengjast og stýra þessum sýndartölvum.
Hugbúnaðaðinum sjálfum er síðan pakkað í Docker gám. Þessir Docker gámar eru síðan hýstir á dockerhub
sem er hægt að keyra upp í prófunarumhverfinu okkar án þess að þurfa að hafa áhyggjur af óstöðugleika
í uppsetningu og keyrslu.



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
