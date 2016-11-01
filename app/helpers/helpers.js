export default  {
	getCurrentDateString: () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		}

		if(mm<10) {
		    mm='0'+mm
		}

		return yyyy+'-'+mm+'-'+dd;
	},
	//-------------------------------------
	//-Gets current date, without any time component
	//-use .valueOf() to convert to number for comparisons
	//-Best not to use == if comparing objects
	//-------------------------------------
	getCurrentDateObject: () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		}

		if(mm<10) {
		    mm='0'+mm
		}

		return new Date(yyyy+'-'+mm+'-'+dd);
	},
	//Export the tvShow object -- how to get data into navbar??
	exportData: (data) => {
		var jsonData = JSON.stringify(data);
		console.log(jsonData);
	},
	initData: [
							{
								"id" : 580,
								"name" : "Raising Hope",
								"summary" : "<p>At 23 years old, Jimmy Chance is going nowhere in life. He skims pools for a living, parties every night and still lives at home with his family, including his parents and his cousin, Mike. Jimmy's life takes a drastic turn when a chance romantic encounter with Lucy goes awry once he discovers she is a wanted felon. Months later, when Jimmy pays a visit to the local prison, he discovers Lucy gave birth to their baby, who he is now charged with raising.</p>",
								"genres" : ["Comedy", "Family"],
								"status" : "Ended",
								"runtime" : 30,
								"premiered" : "2010-09-21",
								"daysAired" : ["Friday"],
								"image" : "http://tvmazecdn.com/uploads/images/medium_portrait/4/11870.jpg",
								"seasons" : 4,
								"seasonsDetail" : [{
										"season" : 1,
										"episodes" : 22,
										"episodeDetail" : [{
												"episodeNumber" : 1,
												"episodeName" : "Pilot",
												"episodeAirDate" : "2010-09-21"
											}, {
												"episodeNumber" : 2,
												"episodeName" : "Dead Tooth",
												"episodeAirDate" : "2010-09-28"
											}, {
												"episodeNumber" : 3,
												"episodeName" : "Dream Hoarders",
												"episodeAirDate" : "2010-10-05"
											}, {
												"episodeNumber" : 4,
												"episodeName" : "Say Cheese",
												"episodeAirDate" : "2010-10-12"
											}, {
												"episodeNumber" : 5,
												"episodeName" : "Happy Halloween",
												"episodeAirDate" : "2010-10-26"
											}, {
												"episodeNumber" : 6,
												"episodeName" : "Family Secrets",
												"episodeAirDate" : "2010-10-26"
											}, {
												"episodeNumber" : 7,
												"episodeName" : "The Sniffles",
												"episodeAirDate" : "2010-11-09"
											}, {
												"episodeNumber" : 8,
												"episodeName" : "Blue Dots",
												"episodeAirDate" : "2010-11-16"
											}, {
												"episodeNumber" : 9,
												"episodeName" : "Meet the Grandparents",
												"episodeAirDate" : "2010-11-23"
											}, {
												"episodeNumber" : 10,
												"episodeName" : "Burt Rocks",
												"episodeAirDate" : "2010-11-30"
											}, {
												"episodeNumber" : 11,
												"episodeName" : "Toy Story",
												"episodeAirDate" : "2010-12-07"
											}, {
												"episodeNumber" : 12,
												"episodeName" : "Romeo and Romeo",
												"episodeAirDate" : "2011-02-08"
											}, {
												"episodeNumber" : 13,
												"episodeName" : "A Germ of a Story",
												"episodeAirDate" : "2011-02-15"
											}, {
												"episodeNumber" : 14,
												"episodeName" : "What Up, Cuz?",
												"episodeAirDate" : "2011-02-22"
											}, {
												"episodeNumber" : 15,
												"episodeName" : "Snip Snip",
												"episodeAirDate" : "2011-03-01"
											}, {
												"episodeNumber" : 16,
												"episodeName" : "The Cultish Personality",
												"episodeAirDate" : "2011-03-08"
											}, {
												"episodeNumber" : 17,
												"episodeName" : "Mongooses",
												"episodeAirDate" : "2011-03-15"
											}, {
												"episodeNumber" : 18,
												"episodeName" : "Cheaters",
												"episodeAirDate" : "2011-04-19"
											}, {
												"episodeNumber" : 19,
												"episodeName" : "Sleep Training",
												"episodeAirDate" : "2011-04-26"
											}, {
												"episodeNumber" : 20,
												"episodeName" : "Everybody Flirts...Sometimes",
												"episodeAirDate" : "2011-05-03"
											}, {
												"episodeNumber" : 21,
												"episodeName" : "Baby Monitor",
												"episodeAirDate" : "2011-05-10"
											}, {
												"episodeNumber" : 22,
												"episodeName" : "Don't Vote for this Episode",
												"episodeAirDate" : "2011-05-17"
											}
										]
									}, {
										"season" : 2,
										"episodes" : 22,
										"episodeDetail" : [{
												"episodeNumber" : 1,
												"episodeName" : "Prodigy",
												"episodeAirDate" : "2011-09-20"
											}, {
												"episodeNumber" : 2,
												"episodeName" : "Sabrina Has Money",
												"episodeAirDate" : "2011-09-27"
											}, {
												"episodeNumber" : 3,
												"episodeName" : "Kidnapped",
												"episodeAirDate" : "2011-10-04"
											}, {
												"episodeNumber" : 4,
												"episodeName" : "Henderson, Nevada-Adjacent Baby! Henderson, Nevada-Adjacent!",
												"episodeAirDate" : "2011-10-05"
											}, {
												"episodeNumber" : 5,
												"episodeName" : "Killer Hope",
												"episodeAirDate" : "2011-11-01"
											}, {
												"episodeNumber" : 6,
												"episodeName" : "Jimmy and the Kid",
												"episodeAirDate" : "2011-11-08"
											}, {
												"episodeNumber" : 7,
												"episodeName" : "Burt's Parents",
												"episodeAirDate" : "2011-11-15"
											}, {
												"episodeNumber" : 8,
												"episodeName" : "Bro-gurt",
												"episodeAirDate" : "2011-11-29"
											}, {
												"episodeNumber" : 9,
												"episodeName" : "The Men Of New Natesville",
												"episodeAirDate" : "2011-12-06"
											}, {
												"episodeNumber" : 10,
												"episodeName" : "It's A Hopeful Life",
												"episodeAirDate" : "2011-12-13"
											}, {
												"episodeNumber" : 11,
												"episodeName" : "Mrs. Smartypants",
												"episodeAirDate" : "2012-01-17"
											}, {
												"episodeNumber" : 12,
												"episodeName" : "Gambling Again",
												"episodeAirDate" : "2012-01-31"
											}, {
												"episodeNumber" : 13,
												"episodeName" : "Tarot Cards",
												"episodeAirDate" : "2012-02-07"
											}, {
												"episodeNumber" : 14,
												"episodeName" : "Jimmy's Fake Girlfriend",
												"episodeAirDate" : "2012-02-14"
											}, {
												"episodeNumber" : 15,
												"episodeName" : "Sheer Madness",
												"episodeAirDate" : "2012-02-21"
											}, {
												"episodeNumber" : 16,
												"episodeName" : "Single White Female Role Model",
												"episodeAirDate" : "2012-03-06"
											}, {
												"episodeNumber" : 17,
												"episodeName" : "Spanks Butt, No Spanks",
												"episodeAirDate" : "2012-03-13"
											}, {
												"episodeNumber" : 18,
												"episodeName" : "Poking Holes in the Story",
												"episodeAirDate" : "2012-03-20"
											}, {
												"episodeNumber" : 19,
												"episodeName" : "Hogging All The Glory",
												"episodeAirDate" : "2012-03-27"
											}, {
												"episodeNumber" : 20,
												"episodeName" : "Sabrina's New Jimmy",
												"episodeAirDate" : "2012-04-03"
											}, {
												"episodeNumber" : 21,
												"episodeName" : "Inside Probe",
												"episodeAirDate" : "2012-04-10"
											}, {
												"episodeNumber" : 22,
												"episodeName" : "I Want My Baby Back, Baby Back, Baby Back",
												"episodeAirDate" : "2012-04-17"
											}
										]
									}, {
										"season" : 3,
										"episodes" : 22,
										"episodeDetail" : [{
												"episodeNumber" : 1,
												"episodeName" : "Not Indecent, But Not Quite Decent Enough Proposal",
												"episodeAirDate" : "2012-10-02"
											}, {
												"episodeNumber" : 2,
												"episodeName" : "Throw Maw Maw from the House (1)",
												"episodeAirDate" : "2012-10-09"
											}, {
												"episodeNumber" : 3,
												"episodeName" : "Throw Maw Maw from the House (2)",
												"episodeAirDate" : "2012-10-16"
											}, {
												"episodeNumber" : 4,
												"episodeName" : "If a Ham Falls in the Woods",
												"episodeAirDate" : "2012-10-23"
											}, {
												"episodeNumber" : 5,
												"episodeName" : "Don't Ask, Don't Tell Me What to Do",
												"episodeAirDate" : "2012-10-30"
											}, {
												"episodeNumber" : 6,
												"episodeName" : "What Up, Bro?",
												"episodeAirDate" : "2012-11-13"
											}, {
												"episodeNumber" : 7,
												"episodeName" : "Candy Wars",
												"episodeAirDate" : "2012-11-20"
											}, {
												"episodeNumber" : 8,
												"episodeName" : "The Walk for the Runs",
												"episodeAirDate" : "2012-11-27"
											}, {
												"episodeNumber" : 9,
												"episodeName" : "Squeak Means Squeak",
												"episodeAirDate" : "2012-12-04"
											}, {
												"episodeNumber" : 10,
												"episodeName" : "The Last Christmas",
												"episodeAirDate" : "2012-12-11"
											}, {
												"episodeNumber" : 11,
												"episodeName" : "Credit Where Credit Is Due",
												"episodeAirDate" : "2013-01-08"
											}, {
												"episodeNumber" : 12,
												"episodeName" : "Lord of the Ring",
												"episodeAirDate" : "2013-01-15"
											}, {
												"episodeNumber" : 13,
												"episodeName" : "What Happens At Howdy's Doesn't Stay At Howdy's",
												"episodeAirDate" : "2013-01-22"
											}, {
												"episodeNumber" : 14,
												"episodeName" : "Modern Wedding",
												"episodeAirDate" : "2013-01-29"
											}, {
												"episodeNumber" : 15,
												"episodeName" : "Yo Zappa Do (1)",
												"episodeAirDate" : "2013-01-29"
											}, {
												"episodeNumber" : 16,
												"episodeName" : "Yo Zappa Do (2)",
												"episodeAirDate" : "2013-02-05"
											}, {
												"episodeNumber" : 17,
												"episodeName" : "Sex, Clown and Videotape",
												"episodeAirDate" : "2013-02-05"
											}, {
												"episodeNumber" : 18,
												"episodeName" : "Arbor Daze",
												"episodeAirDate" : "2013-02-19"
											}, {
												"episodeNumber" : 19,
												"episodeName" : "Making The Band",
												"episodeAirDate" : "2013-02-26"
											}, {
												"episodeNumber" : 20,
												"episodeName" : "The Old Girl",
												"episodeAirDate" : "2013-02-26"
											}, {
												"episodeNumber" : 21,
												"episodeName" : "Burt-Mitzvah: The Musical",
												"episodeAirDate" : "2013-03-28"
											}, {
												"episodeNumber" : 22,
												"episodeName" : "Mother's Day",
												"episodeAirDate" : "2013-03-28"
											}
										]
									}, {
										"season" : 4,
										"episodes" : 22,
										"episodeDetail" : [{
												"episodeNumber" : 1,
												"episodeName" : "Déjà Vu Man",
												"episodeAirDate" : "2013-11-15"
											}, {
												"episodeNumber" : 2,
												"episodeName" : "Burt Bucks",
												"episodeAirDate" : "2013-11-15"
											}, {
												"episodeNumber" : 3,
												"episodeName" : "Ship Happens",
												"episodeAirDate" : "2013-11-22"
											}, {
												"episodeNumber" : 4,
												"episodeName" : "Hi-Def",
												"episodeAirDate" : "2013-11-22"
											}, {
												"episodeNumber" : 5,
												"episodeName" : "Extreme Howdy's Makeover",
												"episodeAirDate" : "2013-11-29"
											}, {
												"episodeNumber" : 6,
												"episodeName" : "Adoption",
												"episodeAirDate" : "2013-11-29"
											}, {
												"episodeNumber" : 7,
												"episodeName" : "Murder, She Hoped",
												"episodeAirDate" : "2013-12-06"
											}, {
												"episodeNumber" : 8,
												"episodeName" : "Dysfunction Function",
												"episodeAirDate" : "2013-12-06"
											}, {
												"episodeNumber" : 9,
												"episodeName" : "The Chance Who Stole Christmas",
												"episodeAirDate" : "2013-12-13"
											}, {
												"episodeNumber" : 10,
												"episodeName" : "Bee Story",
												"episodeAirDate" : "2013-12-13"
											}, {
												"episodeNumber" : 11,
												"episodeName" : "Hey There, Delilah",
												"episodeAirDate" : "2014-01-10"
											}, {
												"episodeNumber" : 12,
												"episodeName" : "Hot Dish",
												"episodeAirDate" : "2014-01-17"
											}, {
												"episodeNumber" : 13,
												"episodeName" : "Thrilla In Natesvilla",
												"episodeAirDate" : "2014-01-24"
											}, {
												"episodeNumber" : 14,
												"episodeName" : "Road To Natesville",
												"episodeAirDate" : "2014-01-31"
											}, {
												"episodeNumber" : 15,
												"episodeName" : "Anniversary Ball",
												"episodeAirDate" : "2014-02-07"
											}, {
												"episodeNumber" : 16,
												"episodeName" : "The One Where They Get High",
												"episodeAirDate" : "2014-02-28"
											}, {
												"episodeNumber" : 17,
												"episodeName" : "Baby Phat",
												"episodeAirDate" : "2014-03-07"
											}, {
												"episodeNumber" : 18,
												"episodeName" : "Dinner with Tropes",
												"episodeAirDate" : "2014-03-14"
											}, {
												"episodeNumber" : 19,
												"episodeName" : "Para-natesville Activity",
												"episodeAirDate" : "2014-03-21"
											}, {
												"episodeNumber" : 20,
												"episodeName" : "Man's Best Friend",
												"episodeAirDate" : "2014-03-28"
											}, {
												"episodeNumber" : 21,
												"episodeName" : "How I Met Your Mullet",
												"episodeAirDate" : "2014-04-04"
											}, {
												"episodeNumber" : 22,
												"episodeName" : "The Father Daughter Dance",
												"episodeAirDate" : "2014-04-04"
											}
										]
									}
								],
								"downloading" : {
									"seasonDownloading" : 4,
									"episodeDownloading" : 11
								},
								"watching" : {
									"seasonWatching" : 1,
									"episodeWatching" : 1
								}
							},
							{
	"id" : 31,
	"name" : "Marvel's Agents of S.H.I.E.L.D.",
	"summary" : "<p>Phil Coulson heads an elite team of fellow agents with the worldwide\n law-enforcement organization known as S.H.I.E.L.D. (Strategic Homeland \nIntervention Enforcement and Logistics Division), as they investigate \nstrange occurrences around the globe. Its members -- \neach of whom brings a specialty to the group -- work with Coulson to \nprotect those who cannot protect themselves from extraordinary and \ninconceivable threats.</p>",
	"genres" : ["Action", "Adventure", "Science-Fiction"],
	"status" : "Running",
	"runtime" : 60,
	"premiered" : "2013-09-24",
	"daysAired" : ["Tuesday"],
	"image" : "http://tvmazecdn.com/uploads/images/medium_portrait/74/186201.jpg",
	"seasons" : 4,
	"seasonsDetail" : [{
			"season" : 1,
			"episodes" : 22,
			"episodeDetail" : [{
					"episodeNumber" : 1,
					"episodeName" : "Pilot",
					"episodeAirDate" : "2013-09-24"
				}, {
					"episodeNumber" : 2,
					"episodeName" : "0-8-4",
					"episodeAirDate" : "2013-10-01"
				}, {
					"episodeNumber" : 3,
					"episodeName" : "The Asset",
					"episodeAirDate" : "2013-10-08"
				}, {
					"episodeNumber" : 4,
					"episodeName" : "Eye Spy",
					"episodeAirDate" : "2013-10-15"
				}, {
					"episodeNumber" : 5,
					"episodeName" : "Girl in the Flower Dress",
					"episodeAirDate" : "2013-10-22"
				}, {
					"episodeNumber" : 6,
					"episodeName" : "FZZT",
					"episodeAirDate" : "2013-11-05"
				}, {
					"episodeNumber" : 7,
					"episodeName" : "The Hub",
					"episodeAirDate" : "2013-11-12"
				}, {
					"episodeNumber" : 8,
					"episodeName" : "The Well",
					"episodeAirDate" : "2013-11-19"
				}, {
					"episodeNumber" : 9,
					"episodeName" : "Repairs",
					"episodeAirDate" : "2013-11-26"
				}, {
					"episodeNumber" : 10,
					"episodeName" : "The Bridge",
					"episodeAirDate" : "2013-12-10"
				}, {
					"episodeNumber" : 11,
					"episodeName" : "The Magical Place",
					"episodeAirDate" : "2014-01-07"
				}, {
					"episodeNumber" : 12,
					"episodeName" : "Seeds",
					"episodeAirDate" : "2014-01-14"
				}, {
					"episodeNumber" : 13,
					"episodeName" : "T.R.A.C.K.S.",
					"episodeAirDate" : "2014-02-04"
				}, {
					"episodeNumber" : 14,
					"episodeName" : "T.A.H.I.T.I.",
					"episodeAirDate" : "2014-03-04"
				}, {
					"episodeNumber" : 15,
					"episodeName" : "Yes Men",
					"episodeAirDate" : "2014-03-11"
				}, {
					"episodeNumber" : 16,
					"episodeName" : "End of the Beginning",
					"episodeAirDate" : "2014-04-01"
				}, {
					"episodeNumber" : 17,
					"episodeName" : "Turn, Turn, Turn",
					"episodeAirDate" : "2014-04-08"
				}, {
					"episodeNumber" : 18,
					"episodeName" : "Providence",
					"episodeAirDate" : "2014-04-15"
				}, {
					"episodeNumber" : 19,
					"episodeName" : "The Only Light in the Darkness",
					"episodeAirDate" : "2014-04-22"
				}, {
					"episodeNumber" : 20,
					"episodeName" : "Nothing Personal",
					"episodeAirDate" : "2014-04-29"
				}, {
					"episodeNumber" : 21,
					"episodeName" : "Ragtag",
					"episodeAirDate" : "2014-05-06"
				}, {
					"episodeNumber" : 22,
					"episodeName" : "Beginning of the End",
					"episodeAirDate" : "2014-05-13"
				}
			]
		}, {
			"season" : 2,
			"episodes" : 22,
			"episodeDetail" : [{
					"episodeNumber" : 1,
					"episodeName" : "Shadows",
					"episodeAirDate" : "2014-09-23"
				}, {
					"episodeNumber" : 2,
					"episodeName" : "Heavy Is the Head",
					"episodeAirDate" : "2014-09-30"
				}, {
					"episodeNumber" : 3,
					"episodeName" : "Making Friends and Influencing People",
					"episodeAirDate" : "2014-10-07"
				}, {
					"episodeNumber" : 4,
					"episodeName" : "Face My Enemy",
					"episodeAirDate" : "2014-10-14"
				}, {
					"episodeNumber" : 5,
					"episodeName" : "A Hen in the Wolf House",
					"episodeAirDate" : "2014-10-21"
				}, {
					"episodeNumber" : 6,
					"episodeName" : "A Fractured House",
					"episodeAirDate" : "2014-10-28"
				}, {
					"episodeNumber" : 7,
					"episodeName" : "The Writing on the Wall",
					"episodeAirDate" : "2014-11-11"
				}, {
					"episodeNumber" : 8,
					"episodeName" : "The Things We Bury",
					"episodeAirDate" : "2014-11-18"
				}, {
					"episodeNumber" : 9,
					"episodeName" : "...Ye Who Enter Here",
					"episodeAirDate" : "2014-12-02"
				}, {
					"episodeNumber" : 10,
					"episodeName" : "What They Become",
					"episodeAirDate" : "2014-12-09"
				}, {
					"episodeNumber" : 11,
					"episodeName" : "Aftershocks",
					"episodeAirDate" : "2015-03-03"
				}, {
					"episodeNumber" : 12,
					"episodeName" : "Who You Really Are",
					"episodeAirDate" : "2015-03-10"
				}, {
					"episodeNumber" : 13,
					"episodeName" : "One of Us",
					"episodeAirDate" : "2015-03-17"
				}, {
					"episodeNumber" : 14,
					"episodeName" : "Love in the Time of Hydra",
					"episodeAirDate" : "2015-03-24"
				}, {
					"episodeNumber" : 15,
					"episodeName" : "One Door Closes",
					"episodeAirDate" : "2015-03-31"
				}, {
					"episodeNumber" : 16,
					"episodeName" : "Afterlife",
					"episodeAirDate" : "2015-04-07"
				}, {
					"episodeNumber" : 17,
					"episodeName" : "Melinda",
					"episodeAirDate" : "2015-04-14"
				}, {
					"episodeNumber" : 18,
					"episodeName" : "The Frenemy of My Enemy",
					"episodeAirDate" : "2015-04-21"
				}, {
					"episodeNumber" : 19,
					"episodeName" : "The Dirty Half Dozen",
					"episodeAirDate" : "2015-04-28"
				}, {
					"episodeNumber" : 20,
					"episodeName" : "Scars",
					"episodeAirDate" : "2015-05-05"
				}, {
					"episodeNumber" : 21,
					"episodeName" : "S.O.S. (1)",
					"episodeAirDate" : "2015-05-12"
				}, {
					"episodeNumber" : 22,
					"episodeName" : "S.O.S. (2)",
					"episodeAirDate" : "2015-05-12"
				}
			]
		}, {
			"season" : 3,
			"episodes" : 22,
			"episodeDetail" : [{
					"episodeNumber" : 1,
					"episodeName" : "Laws Of Nature",
					"episodeAirDate" : "2015-09-29"
				}, {
					"episodeNumber" : 2,
					"episodeName" : "Purpose in the Machine",
					"episodeAirDate" : "2015-10-06"
				}, {
					"episodeNumber" : 3,
					"episodeName" : "A Wanted (In)human",
					"episodeAirDate" : "2015-10-13"
				}, {
					"episodeNumber" : 4,
					"episodeName" : "Devils You Know",
					"episodeAirDate" : "2015-10-20"
				}, {
					"episodeNumber" : 5,
					"episodeName" : "4,722 Hours",
					"episodeAirDate" : "2015-10-27"
				}, {
					"episodeNumber" : 6,
					"episodeName" : "Among Us Hide…",
					"episodeAirDate" : "2015-11-03"
				}, {
					"episodeNumber" : 7,
					"episodeName" : "Chaos Theory",
					"episodeAirDate" : "2015-11-10"
				}, {
					"episodeNumber" : 8,
					"episodeName" : "Many Heads, One Tale",
					"episodeAirDate" : "2015-11-17"
				}, {
					"episodeNumber" : 9,
					"episodeName" : "Closure",
					"episodeAirDate" : "2015-12-01"
				}, {
					"episodeNumber" : 10,
					"episodeName" : "Maveth",
					"episodeAirDate" : "2015-12-08"
				}, {
					"episodeNumber" : 11,
					"episodeName" : "Bouncing Back",
					"episodeAirDate" : "2016-03-08"
				}, {
					"episodeNumber" : 12,
					"episodeName" : "The Inside Man",
					"episodeAirDate" : "2016-03-15"
				}, {
					"episodeNumber" : 13,
					"episodeName" : "Parting Shot",
					"episodeAirDate" : "2016-03-22"
				}, {
					"episodeNumber" : 14,
					"episodeName" : "Watchdogs",
					"episodeAirDate" : "2016-03-29"
				}, {
					"episodeNumber" : 15,
					"episodeName" : "Spacetime",
					"episodeAirDate" : "2016-04-05"
				}, {
					"episodeNumber" : 16,
					"episodeName" : "Paradise Lost",
					"episodeAirDate" : "2016-04-12"
				}, {
					"episodeNumber" : 17,
					"episodeName" : "The Team",
					"episodeAirDate" : "2016-04-19"
				}, {
					"episodeNumber" : 18,
					"episodeName" : "The Singularity",
					"episodeAirDate" : "2016-04-26"
				}, {
					"episodeNumber" : 19,
					"episodeName" : "Failed Experiments",
					"episodeAirDate" : "2016-05-03"
				}, {
					"episodeNumber" : 20,
					"episodeName" : "Emancipation",
					"episodeAirDate" : "2016-05-10"
				}, {
					"episodeNumber" : 21,
					"episodeName" : "Absolution",
					"episodeAirDate" : "2016-05-17"
				}, {
					"episodeNumber" : 22,
					"episodeName" : "Ascension",
					"episodeAirDate" : "2016-05-17"
				}
			]
		}, {
			"season" : 4,
			"episodes" : 6,
			"episodeDetail" : [{
					"episodeNumber" : 1,
					"episodeName" : "The Ghost",
					"episodeAirDate" : "2016-09-20"
				}, {
					"episodeNumber" : 2,
					"episodeName" : "Meet the New Boss",
					"episodeAirDate" : "2016-09-27"
				}, {
					"episodeNumber" : 3,
					"episodeName" : "Uprising",
					"episodeAirDate" : "2016-10-11"
				}, {
					"episodeNumber" : 4,
					"episodeName" : "Let Me Stand Next to Your Fire",
					"episodeAirDate" : "2016-10-18"
				}, {
					"episodeNumber" : 5,
					"episodeName" : "Lockup",
					"episodeAirDate" : "2016-10-25"
				}, {
					"episodeNumber" : 6,
					"episodeName" : "The Good Samaritan",
					"episodeAirDate" : "2016-11-01"
				}
			]
		}
	],
	"downloading" : {
		"seasonDownloading" : 1,
		"episodeDownloading" : 1
	},
	"watching" : {
		"seasonWatching" : 1,
		"episodeWatching" : 1
	}
}

						]
}
