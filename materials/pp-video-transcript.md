0:011 secondfirst thank you so much to everybody here for coming out to hear my talk today I really appreciate it hopefully it's good for you entertaining for you
0:099 secondsand thanks so much about the organizing team for putting together this awesome the conference and giving us a chance to come together and learn some cool stuff
0:1717 secondsso hello I'm Eli I make some weird stuff on the internet sometimes this weird
0:2424 secondsstuff happens at a company called social tables startup in my hometown of Washington DC where I do kind of an even split I guess between front end and
0:3333 secondsnodejs and like WebGL graphics programming type stuff I also organize the DC code pen meet up and make some
0:4040 secondsfunky weird animations 3d art and games and stuff on the side so today I'll be freaking about why focusing on perceived
0:4949 secondsperformance above and beyond objective speed based performance is a smart thing to do a little bit to that and how
0:5656 secondshumans perceive time and opening up a box of tricks to make sites and apps feel faster than they actually are
1:041 minute, 4 secondsfocusing in on techniques that recognize the best impact for a minimum developer effort and I'll close up by talking
1:131 minute, 13 secondsabout a technique called predictive pre-loading which when correctly applied can completely eliminate perceived
1:191 minute, 19 secondsloading time so why proceed apartment performance matters it matters because web performance as a field is
Chapter 2: Web Performance is a matter of time.
1:271 minute, 27 secondsfundamentally all about time and time is a really funny thing it can appear to speed up or slow down it can
1:341 minute, 34 secondsexpand and contract sometimes it can even grind to a halt or even run backwards and for some people time may
1:431 minute, 43 secondsnot even really exist at all but for those of us for whom time does exist this difference is down to the
1:521 minute, 52 secondsdichotomy between objective clock based time and subjective time which is time that we perceive without any sort of
2:002 minutesartificial aids and it's awesome that in the last couple years especially we've seen amazing huge strides in objective
2:072 minutes, 7 secondsperformance between h2 and so and serviceworkers image optimization techniques critical rendering path all these Optima
2:152 minutes, 15 secondsautomated build processes to help us make our sites physically faster and we tend to do this we optimize for
2:222 minutes, 22 secondsobjective time we optimized for speed because it's fundamentally easy to measure we can make our site load by 300 milliseconds faster and we have a number
2:302 minutes, 30 secondsto point to to show that we did such a great job and we do this even with perceived performance when you think about techniques like optimizing for the
2:392 minutes, 39 secondscritical rendering path time to first interactivity font loading techniques they're all fundamentally focused about on objective time they're focused on the
2:472 minutes, 47 secondsclock they're not necessarily focused on the subjective and the million-dollar question that we don't often enough ask
2:552 minutes, 55 secondswhen we're celebrating over cutting our loading time by 500 milliseconds or whatever is what if users don't notice what if they can't notice and the sad
3:043 minutes, 4 secondsfact is oftentimes they don't the reason that they don't is this psychological principle called just noticeable
Chapter 3: Just Noticeable Difference.
3:123 minutes, 12 secondsdifference which defines that between sort of human observable phenomena between stimuli they have to be significantly different enough from each
3:203 minutes, 20 secondsother in order for somebody to distinguish between the two so if you should someone like a bright light bulb and a dim light bulb and you ask them to identify what's the bright one the
3:283 minutes, 28 secondsbright one will have to be some amount brighter than the dim one in order for that person to pick it out of a lineup and the same thing is true of time then
3:353 minutes, 35 secondsthe type of time horizons that we care about in web performance time differences of twenty percent or less are completely imperceptible which means
3:443 minutes, 44 secondsthat if you improve the loading speed of your app or the response time for an API call by twenty percent there is a very good chance that a large amount of your
3:523 minutes, 52 secondsusers will not notice and it will make no difference and because we're not focused on just getting back to zero or making improvements that users just
4:014 minutes, 1 secondbarely notice we're focused on trying to make an actual tangible impact and make our things better we don't want to focus on objective speedups of twenty percent
4:084 minutes, 8 secondswe want to shoot for something more like thirty percent and in a large mature application where a lot of our sort of objective speed low-hanging fruits
4:164 minutes, 16 secondsalready taken care of 30 percent can be a really big number and the sad fact is you know we don't live inside of a web
4:254 minutes, 25 secondsperformance blog post in fact the world that we live in oftentimes looks little bit more like this we don't hold
4:364 minutes, 36 secondsall the cards all the time shipping this type of objective speed improvement might involve the efforts of many different teams working in many
4:444 minutes, 44 secondsdifferent repositories on different services and api's as well as a client-side application maybe in different time zones are working in different languages and it may not be an
4:534 minutes, 53 secondsefficient use of the front-end teams time to ship these types of improvements even if they are able to it just might not be the most efficient thing so my
5:015 minutes, 1 secondpitch for why focusing on perceived performance is smart and it's good is it represents better bang for developer buck that we can make better more
5:115 minutes, 11 secondsobservable subjective improvements by focusing directly on the subjective than focusing on objective speed and hoping
5:185 minutes, 18 secondsthat the subjective follows soon so in order to do that we'll have to understand a little bit about the psychology of how people perceive time
5:265 minutes, 26 secondsand how that works so humans tend to break down activities between active and passive phases active phases are
5:345 minutes, 34 secondscharacterized by higher levels of mental activity passive phases are characterized by lower levels of mental activity so everybody's heard the phrase
5:415 minutes, 41 secondsa watched pot never boils right this is an American idiom it means that when you're bored and you're staring at a pot just waiting for it to boil it can seem
5:505 minutes, 50 secondslike time stretches on into an eternity and the data backs this up this is true humans tend to overestimate time spent in passive phases by 36% they feel 36%
6:006 minutesslower and the reason for that is that the primary neurotransmitter associated with the perception of time is dopamine
6:076 minutes, 7 secondsso in states where you're not mentally engaged you're not producing as much dopamine time seems to stretch out in
6:146 minutes, 14 secondstimes where you are mentally engaged or you are producing more dopamine time seems to compress so we do this everyday
6:216 minutes, 21 secondswe divide our activities consider the idea of commuting to work sometimes your if you're driving to work those of us who lives in this living the stick
6:306 minutes, 30 secondssometimes we have to do that consider sometimes you're on side streets scooting along and actively mentally engaged in the act of driving and
6:376 minutes, 37 secondssometimes you're on a main arterial road stuck in traffic and not mentally and gay twiddling your thumbs waiting for traffic in front of you to clear and I
6:456 minutes, 45 secondsknow for me that this sort of passive phase of this activity waiting in traffic always seems to take longer and this is the same on the web too so
6:526 minutes, 52 secondshere's a little demo of me browsing Amazon for my next outfit and you can see as I browse I switch between active
6:596 minutes, 59 secondsand passive phases active phases when I'm consuming content when I'm interacting with the page when I'm reading something and passive when
7:077 minutes, 7 secondsessentially I'm waiting for the next page to load this transition does not happen immediately it takes about one
7:147 minutes, 14 secondssecond for a user trend make that transition from an active state to a passive state so psychology out of the
7:217 minutes, 21 secondsway what does this mean for us we can really sort of do to genre zuv wait of ways to do this we can either keep users
7:297 minutes, 29 secondsin an active state and do everything that we can to keep them from entering a passive mental state or in times where pass end-user entering a passive mental
7:387 minutes, 38 secondsstate is unavoidable we can play some tricks and make some illusions that can make that time seem to pass more quickly
7:457 minutes, 45 secondsso keeping users active this is super important for short directions because as it takes one second for users to make
7:537 minutes, 53 secondsa transition between an active to a passive phase if we can get all of our loading done in that one second we can keep them active and they never have any disruptions they stay in flow so we can
8:028 minutes, 2 secondsdo sort of three main easy things to help with this one we can make sure that we don't tip our hand and go out of our way to tell users that they're waiting
8:108 minutes, 10 secondsfor something we make sure that we respond to users immediately even if nothing is actually happening in the app and we can change the event listeners
8:178 minutes, 17 secondsthat we use to be a little bit more a little bit less conventional but a little bit more responsive in order to get a head start on loading we need to
8:248 minutes, 24 secondslook so first let's talk about resisting the temptation to use loading indicators and I know what you're thinking right whoa whoa whoa slow down
Chapter 4: #Resist loading indicators
8:328 minutes, 32 secondsdon't use loaders no spinners no progress bars isn't that what perceived performance is all about and you're right but before we
8:428 minutes, 42 secondslearn how to use loaders we need to learn how to not abuse loaders so showing someone a spinner or a progress
8:498 minutes, 49 secondsbar or some other loading indicator is a cue to users that they've entered a time where they have to wait or something so what they're doing if
8:578 minutes, 57 secondsyou're there already in an active mental state and you're prematurely showing them a loader before they've naturally made that transition into a waiting
9:049 minutes, 4 secondsState or a passive state you're picking them up out of an active mental state and putting them in a passive mental state which is having the opposite effect of what we want it's making our
9:129 minutes, 12 secondsapp feel slower so a good rule of thumb that you should carry with you always is only add loaders as you're anticipated
9:209 minutes, 20 secondswaiting time approaches one second okay so now that's out of the way we can talk about how to actually keep users engaged
9:289 minutes, 28 secondshaving an app that feels immediate and present and tactile is super important because users like to have the idea that
9:359 minutes, 35 secondsthey can maintain this two-way dialogue with the user with the app so it's like it's right there with them and having an app that responds immediately to every
9:439 minutes, 43 secondsuser interaction makes it feel like that app is holding up its end of that conversation the quickest and easiest way to do this is to make sure that you
9:509 minutes, 50 secondsapply active States to all of your elements active States work just like hover States except instead of firing when you mouse over they fire when you
9:599 minutes, 59 secondsclick or touch on them they're implemented in exactly the same way they work in exactly the same way they're super quick and easy to implement which is why it's so
10:0610 minutes, 6 secondsunfortunate that there are so many sites and apps that don't implement active States at all because they're such a quick win once you've done that you can
10:1410 minutes, 14 secondshone in on optimism and not this kind of optimism although this kind of optimism
10:2110 minutes, 21 secondsis still very very important indeed but what we're talking about here isn't optimistically updating UI so in a
10:2810 minutes, 28 secondstraditional UI or a pessimistic UI we only update the user interface when we retrieve the response from a server so the interface just exists to mirror
10:3610 minutes, 36 secondswhat's out there on in server land so that means when we click our like on our handsome goat photo we make a request and then we update the user interface
10:4410 minutes, 44 secondswhich is a little slow although admittedly it's quite honest we can take an alternate tack and immediately update
10:5210 minutes, 52 secondsthe UI by optimistically assuming that that request will be successful so the 99% of users that had that request is
11:0011 minutessuccessful for get a positive experience and then for the 1% of users where that request isn't successful then we can worry about a failure state when that
11:0811 minutes, 8 secondshappened the last thing we can do to keep users active is to change the event listeners that we use to try and get a head start
11:1611 minutes, 16 secondsso remember that takes about one second to enter a passive state which means that we can keep users active if we get all of our loading done and that means
11:2511 minutes, 25 secondsthat in order to do that we have to react as soon as the user signals intent and so when you think about the most sort of common event listener that we
11:3311 minutes, 33 secondsall handle we all use just the click handler user signals their intent to click on something by pushing their mouse button down but a click event
11:4111 minutes, 41 secondsdoesn't fire until the mouse button comes back up again it's the mouse down event listener that fires when the mouse button goes down and that means that
11:4811 minutes, 48 secondsthere's this sort of amount of time where a user signaled their intent by pushing their mouse button down and we haven't done anything because we're
11:5611 minutes, 56 secondsstill waiting for the mouse button to come back up again so I made a quick little demo and submitted it to participants on Mechanical Turk to get an understanding of what sort of time duration we were dealing with and we can
12:0412 minutes, 4 secondsdo the same demo here now so here I click on this button and I held my mouse button down for 81 milliseconds do it
12:1012 minutes, 10 secondsagain 148 here 147 124 and that's pretty much squares with what I found which is users tend to hold their mouse button
12:1912 minutes, 19 secondsdown when they click on stuff for 100 to 150 milliseconds to put it in another way that means that by switching to a mouse down event listener from a click
12:2712 minutes, 27 secondsevent listener it means we get a 100 to 150 millisecond head start and loading whatever we need to do right off the top basically totally for free and sort of
12:3612 minutes, 36 secondsby accident in the same experiment I found that users tended to hold their mouse button down a little bit longer on
12:4312 minutes, 43 secondsbuttons and elements that had an active state applied to them my theory is that subconsciously reacting to the page responding to their input they hold
12:5212 minutes, 52 secondstheir mouse button down for a few extra frames as they sort of like observe the things are happening on the on the page and sort of by playing around with
12:5912 minutes, 59 secondsdurations and things I arrived at a sweet spot of 200 milliseconds for an active animation duration giving you a
13:0613 minutes, 6 secondsplus 50 millisecond bonus for how long the user holds their mouse button down for sort of totaling out like a hundred
13:1313 minutes, 13 secondsand fifty to two hundred millisecond head start which isn't bad we shouldn't scoff at that this works on touch devices too we just
13:2113 minutes, 21 secondsto be a little bit more careful we can begin our loading on touchstart as long as we don't confirm and take action with
13:2913 minutes, 29 secondswhatever we've loaded until a touch end that hasn't been interrupted by some sort of threshold bound touch move event the reason for this is of course people
13:3813 minutes, 38 secondson touch devices fire off touch move events when they're navigating around the page when they're scrolling and doing all sorts of other gesture based interactions and we don't want to
13:4513 minutes, 45 secondsaccidentally surprise them by opening up a new page or popping a modal or doing whatever we're doing because they're scrolling and the thumb happened to found to come down on a button okay so
13:5413 minutes, 54 secondsthose are three quick and easy things to do that we can keep users active and help manage perceived loading and sort of the types of anticipated situations
14:0214 minutes, 2 secondswhere loading is going to take less than one second but what happens when loads take longer than that one to four
14:0914 minutes, 9 secondsseconds or so if you have a slower API or you requesting large images loading three models or any sort of large assets
14:1614 minutes, 16 secondsand this type of weight is common and what happens is you really start to lose people as passive States last from one
14:2314 minutes, 23 secondsto four seconds so it's really critical to get this right we can do three sort of best bang for
14:3014 minutes, 30 secondsbuck things here one is choosing the type of animation that can create an optical illusion that time is moving
14:3714 minutes, 37 secondsmore quickly than it actually is the second thing that we can do is adapt our loading durations and indeed our
14:4314 minutes, 43 secondsentire loading scheme based on measuring each user's request and establishing a picture of what that users connection
14:5114 minutes, 51 secondsspeed is and three if all else fails we can distract them with shiny objects so
14:5814 minutes, 58 secondsfinally we can talk about progress bars a researcher named David Meister conducted research on cueing behavior
15:0515 minutes, 5 secondspeople help people wait for things and one of his key takeaways from this big study was that uncertain weights weights
15:1215 minutes, 12 secondswhere people don't know how long they're going to be waiting for feel longer than waits where they have an idea of how much time is left and the reason for
15:2015 minutes, 20 secondsthis is subconscious anxiety waiting for something is unpleasant not knowing when something is unpleasant will end causes
15:2715 minutes, 27 secondssome anxiety anxiety suppresses dopamine production which slows time down progress bars help us fix this because
15:3615 minutes, 36 secondsthey give users a sense in relative terms of how long they have been waiting and how much longer they have left to go but not all progress bars are created
15:4415 minutes, 44 secondsequal and the right animation can make a tremendous tremendous difference here so a team of graduate students at Carnegie Mellon conducted a study where they
Chapter 5: Animation makes a difference.
15:5315 minutes, 53 secondsfound that progress bars that have bands in them or some sort of element within the bar that animate in the opposite
16:0016 minutesdirection of main progress bar flow feel like the progress bar is going faster and furthermore you can create the impressions bars moving faster still if
16:0816 minutes, 8 secondsthose bars bands elements or whatever accelerate as they go through their motion this creates an optical illusion
16:1616 minutes, 16 secondssimilar to the type that you experience when you're sitting on a train and you look out the window and you see another train passing you in the opposite direction and it seems like your
16:2316 minutes, 23 secondsrelative speeds have doubled it's the same sort of illusion at play and at the end of their study what they concluded is that bars with accelerating bands
16:3116 minutes, 31 secondsfeel make it seem like time is passing 12% faster than when they're given no loading indicator at all and that 12%
16:3916 minutes, 39 secondsnumber may seem small but if you recall that if you are taking an objective speed based approach to solving this problem
16:4716 minutes, 47 secondsyou'd have to improve the load time by 20% just to get people to notice any change at all so by implementing the
16:5416 minutes, 54 secondsright sort of progress bar you can achieve a 12% subjective speed-up rather than having a twenty percent objective
17:0117 minutes, 1 secondspeed-up just to get back to zero so this represents real value for us as developers all this great stuff about
17:0917 minutes, 9 secondsprogress bars and we've forgotten something but what about spinners I feel kind of meh about spinners to be honest
17:1717 minutes, 17 secondsand the reason that I feel mad about spinners is they're just not particularly versatile if there's less if the loading time is gonna take less
17:2517 minutes, 25 secondsthan one second we don't want to show use anything at all and if it's any more than two seconds really really need to show them some sort of loading animation
17:3317 minutes, 33 secondsthat gives them a sense of how much longer they have to wait which means that spinners are only really useful between one and two seconds and during
17:4017 minutes, 40 secondsthat time frame a progress bar does a fine job - the real reason that you seem to see spinners everywhere is that they're both a honest
17:4817 minutes, 48 secondsand they're easy to implement in order to have a quote unquote real progress bar you need to set up some sort of
17:5617 minutes, 56 secondspolling endpoint or WebSocket connection so you can continuously update the progress bar with information about how the loading is going which in a lot of
18:0418 minutes, 4 secondssmall cases can represent complete overkill which is why you see a lot of spinners and why most progress bars you see on the Internet are completely fake and by
18:1218 minutes, 12 secondsfake I mean it's one static duration like CSS animation that just moves from left to right and when the loading is
18:1918 minutes, 19 secondsdone you animate it to completion and you know most progress bars are fake many are pretty bad and the reason that
18:2718 minutes, 27 secondsthey're really bad is because like a clock that's only right twice a day a broken clock a fake progress bar with a
18:3418 minutes, 34 secondsfixed duration is only accurate if your connection speed is the same as the developers and if you're too fast you get the problem where we're tipping our
18:4218 minutes, 42 secondshand and we're showing them a loading indicator that they didn't need and if it's too slow it's even worse because it animates the 95 percent and then just
18:4918 minutes, 49 secondssits there mocking you and driving you crazy and you'll leave this site unless it's Twitter and you're like me and you're addicted because it makes you
18:5718 minutes, 57 secondsfeel bad so if real progress bars are overkill and we need to use some sort of progress bar in order to give users certainty
Chapter 6: Adaptive loading
19:0619 minutes, 6 secondswhat do we do how do we make our fake progress bars better and how we do this is with a technique called adaptive
19:1319 minutes, 13 secondsloading so we can modulate the duration of our fake progress bars we can make them more real by measuring our users
19:2219 minutes, 22 secondsrequests and adjusting the progress bar duration based on how long it takes users to complete requests as they move
19:3019 minutes, 30 secondsthrough an app sort of get a sense of their connection speed so here's some like very simple certified non-scary code that we can go through to see how
19:3919 minutes, 39 secondsthis works I'm just doing in a little bit so it's a little bit more readable so here's like an an it function that might run an app startup when you're hydrating states but really you'd want
19:4819 minutes, 48 secondsto do this anytime a user makes a request before you send it off you take a high-resolution time stamp then when you get the response from very serious
19:5619 minutes, 56 secondsAPI URL you take another time stamp and act out your first one to get how long that API round trip took to complete you
20:0420 minutes, 4 secondsthen pass that into some sort of function along with how long you expected that API call to take on sort
20:1120 minutes, 11 secondsof a representative connection that most of that you feel is representative of your users and you divide them into each
20:1920 minutes, 19 secondsother of the observed versus expected time to get what I'm calling a performance scaler which is one number that you can multiply to expected
20:2820 minutes, 28 secondsdurations to set to make your progress bar directions more accurate in order to make this more sense we can talk about it in real terms so if you expected this
20:3620 minutes, 36 secondsrequest to take one second and a user has a slightly faster connection speed than your average user and it only took them half a second then your performance
20:4420 minutes, 44 secondsscaler would be 0.5 so for your next request where you want to show them a progress bar and you expect that duration to take two seconds you multiply in your performance scaler
20:5320 minutes, 53 secondstwo times 0.5 is one so you've cut the duration of the progress bar in half to reflect the user's connection speed
21:0021 minutesbeing twice as quick this is like the world's simplest example of how you could implement this so before you go and do this in production I want to talk
21:0821 minutes, 8 secondsabout a couple things that I left out of the code example in the interest of both simplicity and universality one you want to make sure that you definitely
21:1621 minutes, 16 secondsnormalize for either the resource size that you're requesting or the complexity of the API call that you're making the type of payload they're sending or what
21:2321 minutes, 23 secondsyou would expect back because as everybody knows or maybe not not all API calls to the same endpoint are created equal you know you can make
21:3121 minutes, 31 secondsa call to go request an image and it can resolve way faster if it's a small image than a big image so you don't want to throw off your performance scale or just because a user requested a small image
21:3921 minutes, 39 secondsthan a big image so you need to save like your resource size and metadata and factor that into your performance scaler and before you start adjusting progress
21:4721 minutes, 47 secondsbars the second thing you want to do once you're comfortable using this to just adjust progress bar duration which
21:5421 minutes, 54 secondsis the simplest thing you can do is to start using performance scaler to adapt your entire loading scheme so rather than just take this in and make a
22:0222 minutes, 2 secondsprogress bar shorter or longer to reflect the users conditions you could if the user is going really fast decide to show them a spinner instead of a progress bar or you could show them no
22:1122 minutes, 11 secondsloading indicator at all and if they have a release look much slower action you could show them a progress bar with some explanation to give them context about why their weight is so long or you can show them an animated
22:1922 minutes, 19 secondsit's black screen or any number of other things the third thing you want to do is to have some sort of automated way to set your baseline expected times this
22:2822 minutes, 28 secondstechnique is completely meaningless without accurate data about how long you would expect this to take with some sort of normalized connection it's reflective
22:3622 minutes, 36 secondsof your users and so you can set this in some sort of integration test runner that makes real requests against real api's if you have if you are employing
22:4422 minutes, 44 secondsone so that way if like an API team ships a fix and suddenly an endpoint responds twice as fast you won't have to
22:5222 minutes, 52 secondsalter any client-side code to reflect that new reality your integration test Runner as it's making these requests will pick up that it's faster and right
22:5922 minutes, 59 secondsout to a file somewhere that you can use in your client side app that hey the expected duration for this is now less
23:0623 minutes, 6 secondsnow as durations start to creep longer than four seconds we have to resort to extreme means like dr. Zoidberg we've
23:1423 minutes, 14 secondsgot to climb up on our rubber ball and juggle some torches in order to keep them involved and to keep and to pull them back into an active State this
23:2123 minutes, 21 secondsisn't as degrading as you might think slack which is a very respectful company I've been told has clickin ducks a
23:2823 minutes, 28 secondsmaster class in this they take you from this initial animated branded fancy spinner into a splash screen with a motivational quote for you to read and
23:3723 minutes, 37 secondsconsume and another loading indicator into your last absorbed content while they have an animated skeleton screen that populates in your channels and
23:4423 minutes, 44 secondsmixed messages so they take you from loading screen to loading screen to loading screen to loading screen constantly forcing you to adjust they
23:5223 minutes, 52 secondsshow you a motivational quote or something to read in order to make your mind active so what they're doing is rather than just letting you chill in
24:0024 minutesthis passive state while it takes 12 seconds for this app to boot up they're pulling you back into an active state continuously over and over and over
24:0724 minutes, 7 secondsagain trying to keep you active and trying to make the time feel like it takes less so n and game devs do this
24:1524 minutes, 15 secondsall the time games take forever to load they often load off of spinning discs hard drives rather than straight up from memory so they frequently have to deal
24:2224 minutes, 22 secondswith challenges that we don't as web developers and managing perceived loading so we can learn from things that they do here's a clip from
24:2824 minutes, 28 secondsFIFA a soccer game where I'm setting up a match between Argentina and Brazil and I click a to play match and instead of being taken into a loading screen or a
24:3724 minutes, 37 secondsprogress bar I'm taken into this interactive play space wearing takes some shots on goal or dribble around or play any number of minigames and little challenges either alone or with a friend
24:4524 minutes, 45 secondsrather than just staring at a loading screen and then when I'm ready to be done I can press Start to to start the actual game and the reason that you
24:5324 minutes, 53 secondsdon't see this as often as you do is that Namco held a patent on this for a long long time and that patent extended out both into
25:0125 minutes, 1 secondmobile apps and the web blocking you from ever using mini games or quote interactive loading experiences so now
25:0825 minutes, 8 secondsthat that that patent has expired I believe it expired late 2015 I would expect to start seeing these more and start feeling uncomfortable using
25:1625 minutes, 16 secondsinteractive loading experiences in production when you expect loading to take a very significant amount of time but ten seconds or more if this feels
25:2425 minutes, 24 secondslike cheating that's basically because it is but showing someone content that's completely extraneous if it helps make
25:3125 minutes, 31 secondsthe loading experience seem like it's going faster than it actually is isn't so bad and we're not really doing them a disservice so finally I want to talk
25:4125 minutes, 41 secondsabout predictive pre loading which has the potential if correctly applied to completely eliminate all perceived
25:4725 minutes, 47 secondsloading so if you remember way back when we were talking about that we wanted to react as soon as users signal intent we're gonna change our event listeners
25:5625 minutes, 56 secondsto make that happen well what if we could predict their intent before they definitively signal it then we could get an even bigger head start if we could
26:0526 minutes, 5 secondsextrapolate this out game devs have to do this all the time it's one of the techniques that they rely on the tricks to manage the loading time and keep it
26:1226 minutes, 12 secondshidden from a player so here's a clip that I'm gonna play shortly from a game called Metroid Prime that came out years and years ago and developers ran into
26:2026 minutes, 20 secondssome really Stern Hardware restrictions in making this game they could only load a handful of rooms into memory at any
26:2926 minutes, 29 secondsone time but on the other hand they wanted to have this game that felt open and expansive that didn't prevent present loaders loading screens to to
26:3626 minutes, 36 secondsusers and allowed players to pass through their experience seamlessly so they created a mechanic that distant players could unlock doors by shooting
26:4626 minutes, 46 secondsthem which I thought was something that was only okay to do in Texas but apparently works in space too and that would unlock a door and then based on
26:5326 minutes, 53 secondsthe user's current behavior of walking towards an unlocked door they would load the room behind that door into memory as
27:0127 minutes, 1 secondthe player approached it so they look at a current picture of the users behavior in this case moving towards an unlocked
27:0827 minutes, 8 secondsdoor and they extrapolated that their intent was to move through the door and pre-loaded the room beyond it there was no perceived load the door just opens as
27:1627 minutes, 16 secondsyou approach we don't have to do this with crazy machine learning stuff although you certainly could in fact I'd
27:2527 minutes, 25 secondsbet that there are plenty people in this room who have already done this in production without necessarily realizing
27:3127 minutes, 31 secondsit show hands who's ever like lazy loaded content on scroll lazy loaded images or whatever see plenty of people
27:3927 minutes, 39 secondslots of hands that's predictive pre loading at its essence you're taking a picture of the users current behavior scrolling and you
27:4727 minutes, 47 secondsare adjusting your your idea of what their intent is by assuming that because
27:5527 minutes, 55 secondsthey're scrolling they want to access the next bit of content which is an easy prediction to make and your pre loading that content into the browser before
28:0328 minutes, 3 secondsthey arrive at it so that for the user it's completely seamless that's what predictive pre loading is but more than just lazy loading content
28:1028 minutes, 10 secondson scroll we can take this idea and run way far with it so take for example like the idea of a checkout form so how this
28:1828 minutes, 18 secondstraditionally would work is we put in our name and then your address and then you go on to the next page and we click
28:2628 minutes, 26 secondscheckout and it's loading in the next page it's loading these icons for cards it's loading specialized card validation
28:3528 minutes, 35 secondsJavaScript and order submission JavaScript that we've smartly split off we've done some code splitting and we've kept that bundle separate and then we
28:4328 minutes, 43 secondscan load it when you just click the button that's what you do it normally would do we can also make an assumption that because this form has many steps
28:5028 minutes, 50 secondsand that because a user is engaged in fill towards the end of the forum that they were likely to want to move on to the next step which is exactly what we did
28:5928 minutes, 59 secondswe've pre-loaded the page while I was typing and there's no perceived load this is something that you can do in basically every form that you have that
29:0629 minutes, 6 secondshas more than one step right now it's a very easy assumption to make that if a user is approaching the end of form step a that they want to go to form step B
29:1529 minutes, 15 secondsand you can preload form step B before they get there in this case we were able to predict that two seconds in advance which was way
29:2229 minutes, 22 secondsmore than enough time to load that next view and depending on how early you feel comfortable pre loading the next page based on data on your own users you
29:3029 minutes, 30 secondscould push this even further and get an even bigger head start while this technique is particularly well suited to things like forms and linear flows it
29:3829 minutes, 38 secondscan also be done with more complex user interactions like clicking a button so our sort of baseline here is this
29:4529 minutes, 45 secondsisolated big call-to-action button and we're going to click it and run a load a 3d model to play with in this little
29:5029 minutes, 50 secondsviewport and now remember that loading onmousedown is faster than loading on
30:0030 minutesclick well what if we could take that a step further and load on hover which is what I did for a long long time before
30:0730 minutes, 7 secondsrealizing that you could more than just loading on hover you could study mouths the pattern of Mouse deceleration and start loading things as Matt the mouse
30:1630 minutes, 16 secondscursor decelerates towards an object and you compare these two behavioral quirks that people like to watch hover like to
30:2330 minutes, 23 secondswatch hovers and that people necessarily have to slow their mouse cursor as they approach something they're going to click on you can pair these two together to help preload a button with a high
30:3330 minutes, 33 secondslevel of accuracy and with like far out enough to make a real substantive difference so we're going to exploit these two behavioral quirks together
30:4130 minutes, 41 secondsthat people tend to watch hovers and that people necessarily slow their cursor so I submitted a little demo to people on Mechanical Turk asking them to
30:5030 minutes, 50 secondsevaluate an app that I made and really I all I was doing was studying how long they hovered on buttons before they clicked on them and I showed them a variety of different things and what I
30:5930 minutes, 59 secondsfound is that people were more willing to watch fancy elaborate hovers like this one with this fancy gooey liquid fill then they were buttons
31:0731 minutes, 7 secondsor a little bit more simple like this one with its little flashy fill and what I found after much study was that fancy
31:1531 minutes, 15 secondshovers and I'm defying fancy as a very scientific term where what I'm basically mean by that is there's more than one element of motion in the animation and
31:2431 minutes, 24 secondsthe users are unlikely to have seen something like it recently and they were willing to watch those animations for longer up to a sweet spot of about 600
31:3331 minutes, 33 secondsmilliseconds that factor does fall off as they encounter that hover animation more and more and more but the fall-off is less pronounced for animations that
31:4131 minutes, 41 secondsare fancy because I think people enjoy watching them and experiencing them so that'll buy us something like 600 milliseconds the second thing that we
31:5031 minutes, 50 secondscan do is use a library developed by a developer called Callum McRae at a
31:5731 minutes, 57 secondscompany called Sam knows and this was open source like two weeks ago so it's still very new but I wanted to make sure that I mentioned today because I'm so
32:0532 minutes, 5 secondsexcited about its potential how future link works is it tracks cursor position and speed the red lines are deceleration
32:1432 minutes, 14 secondsand the green dots are sort of where future link is predicting the cursors going to end up so how it works is it
32:2232 minutes, 22 secondstakes not just deceleration but the rate of deceleration to predict the cursors landing spot should that rate of deceleration stay the same and so it
32:3032 minutes, 30 secondsstarts plotting where it thinks it's going to be and once it gets enough sort of plots in an area around a link or a button or whatever element that you pass
32:3832 minutes, 38 secondsinto the future link constructor you can trigger a function when it predicts a click so we're gonna combine those two
32:4632 minutes, 46 secondsthings together the tendency to watch hovers and future link link prediction to see how long of a performance game we can get to see how far out we can
32:5532 minutes, 55 secondspredict a click before the click occurs I'm gonna turn on the load debug information here so I can see my cursor speed so blue is acceleration red is
33:0333 minutes, 3 secondsdeceleration and here we go and we've predicted a click Hubbard and my demo book Brook demo gods
33:1033 minutes, 10 secondsgoddammit there we go and so we were able to cut like 80 percent of our load right off the top just by combining
33:1933 minutes, 19 secondsthese two behavioral course together and that was able to give us like 1.5 seconds and it really depends
33:2733 minutes, 27 secondsbased on how big the element is and how isolated it is so the more isolated the element is the bigger sort of prediction radius you can have around it and so the
33:3633 minutes, 36 secondsfurther out you can accurately predict a click and the more headstart you can get but in this case we're able to get about 1.5 seconds and in places where I've
33:4333 minutes, 43 secondsimplemented it on projects that's pretty much what I've seen so predictive reloading is a super powerful tool right we can completely hide our perceived
Chapter 7: Predictive preloading is a very powerful tool.
33:5233 minutes, 52 secondsloading in certain cases but with great power comes great responsibility we have to make sure that we use this wisely whenever we make predictions
34:0034 minutesabout user behavior we will get it wrong some of the time that means that some users will have resources loaded
34:0934 minutes, 9 secondsJavaScript loaded and they're never going to use them so we need to make sure that we mitigated that risk with data study user behavior flows study
34:1834 minutes, 18 secondsheat maps to understand where predictive pre-loading will have the greatest impact with the greatest accuracy and then the first thing you want to do is
34:2634 minutes, 26 secondsmake sure you you implement it dry so if you're putting future link on a button instead of that function firing some
34:3434 minutes, 34 secondsasset requests when it predicts a click instead just fire a little piece of analytics saying hey I've predicted a click on this button and then you can
34:4134 minutes, 41 secondswait to see if that prediction was successful or not and build a picture of your false positive rate and if you're
34:4934 minutes, 49 secondscomfortable with the default your false positive rate out there in production with actual users then you can decide for yourself whether predictive
34:5834 minutes, 58 secondspre-loading is a good fit for me that's about a 10% false positive rate is something that I'm comfortable with so TLDR perceived performance is
35:0835 minutes, 8 secondsimportant because right now for many mature web apps perceived performance represents low-hanging fruit it allows
35:1635 minutes, 16 secondsyou to directly address subjective perceptions rather than simply focusing on the objective chipping away at both
35:2335 minutes, 23 secondsdiminishing returns and the just noticeable difference threshold we can do this by making sure that our apps are
35:3035 minutes, 30 secondsimmediate and responsive to user input and Alfred them real live feedback we can make sure that we tailor our solution to each individual user and
35:3935 minutes, 39 secondsindeed each individual session to make sure that it suits both them the resource that they're requesting and their connection speed we need to react
35:4735 minutes, 47 secondsquickly to user input by changing the event listeners that we use and extrapolate user intent to get a bigger advantage wherever we can with
35:5535 minutes, 55 secondspredictive pre-loading we can introduce predictive pre-loading bit by bit it's not something that should be implemented all at once or indeed implemented all
36:0436 minutes, 4 secondsover an application pick your spots where you think it's going to have have impact study at first and then implement it at the end of the day never forget
36:1336 minutes, 13 secondsthat nobody browses the web with a stopwatch objective time doesn't matter the only thing that really counts is the subjective the only thing that really
36:2236 minutes, 22 secondscounts is how it feels and if you're focusing on this objective and you're focusing on the users feeling you're really focusing in on the user and at the end of the day that's really what
36:3036 minutes, 30 secondswe're all here to do thanks