#Vagrant
Lausn til að sjálfvirknivæða gerð tölvuumhverfa frá fyrirfram skilgreindri uppskrift.

#VirtualBox
Lausn til að keyra sýndartölvur. Gerir notendum kleif að keyra margar tölvur með
mismunandi stýrikerfum á einni tölvu. Þessar sýndartölvur er jafnframt hægt að
færa yfir á aðrar tölvur.

#Grunt
Lausn sem mikið er notuð við að þróun "front end" vefumhverfa. Grunt er "build"
kerfi sem sjálfvirknivæðir ýmsar aðgerðir sem þörf er á þróunarferlinu, til dæmis:
- Minnka javascript kóða fyrir dreifingu (e. minify)
- Tiltekt í kóðastrúktúr áður en kóði er notaður
- Staðfesta kóða útfrá forritunarreglum (e. linting)
- Sérsmíðaðar aðgerðir sem þörf er á fyrir viðkomandi kerfi

#npm
Lausn til að sækja javascript hugbúnaðarpakka. Mikið notað við hugbúnaðargerð þar
sem hægt er að afmarka kjarna forrits og notast við npm til að sækja viðbótarforrit
sem hugbúnaðurinn reiðir á útfrá fyrirfram skilgreindi pakkaskilgreiningu.

#nodejs
Lausn sem er byggð á javascript og nýtir atburði til að bregðast við aðstæðum sem keyrir kóða hengdan á viðkomandi atburð (e. event callback). T.d. þegar netfyrirspurn kemur inn (vefþjónusta) eða stýrikerfi klárar að sækja skrá frá skrárarkerfi.

#bower
Samskonar lausn og npm þar sem helsti munurinn liggur í því að npm sækir "dependant" pakka oft
fyrir hverja lausn og kemur þannig í veg fyrir árekstra á milli "dependencies". Bower notast
hinsvegar við flatan strúktúr sem mögulega þarf handvirkt þarf að stilla/lagfæra "dependencies"
á móti kemur að biðlarar þurfa ekki að sækja sama pakkan aftur og aftur.
