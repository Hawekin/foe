/*
 * 
 * Define Kindle
 * 
 */

Scenes.Kindle = {};

function Kindle(storage) {
	Entity.call(this);
	this.ID = "Kindle";
	
	// Character stats
	this.name = "Kindle";
	
	//this.avatar.combat = Images.kindle;
	
	this.currentJob = Jobs.Mystic;
	this.jobs["Fighter"]   = new JobDesc(Jobs.Fighter);
	this.jobs["Scholar"]   = new JobDesc(Jobs.Scholar);
	this.jobs["Scholar"].mult = 3;
	this.jobs["Ranger"]    = new JobDesc(Jobs.Ranger);
	
	this.jobs["Mage"]      = new JobDesc(Jobs.Mage);
	this.jobs["Mage"].mult = 5;
	this.jobs["Mystic"]    = new JobDesc(Jobs.Mystic);
	this.jobs["Mystic"].mult = 3;
	this.jobs["Healer"]    = new JobDesc(Jobs.Healer);
	this.jobs["Healer"].mult = 2;
	
	this.jobs["Elementalist"] = new JobDesc(Jobs.Elementalist);
	this.jobs["Elementalist"].mult = 3;
	this.jobs["Warlock"]      = new JobDesc(Jobs.Warlock);
	this.jobs["Warlock"].mult = 2;
	this.jobs["Hypnotist"]    = new JobDesc(Jobs.Hypnotist);
	this.jobs["Hypnotist"].mult = 3;
	
	this.maxHp.base        = 70;
	this.maxSp.base        = 60;
	this.maxLust.base      = 30;
	// Main stats
	this.strength.base     = 15;
	this.stamina.base      = 13;
	this.dexterity.base    = 20;
	this.intelligence.base = 25;
	this.spirit.base       = 25;
	this.libido.base       = 10;
	this.charisma.base     = 10;
	
	this.level = 1;
	this.sexlevel = 1;
	this.SetExpToLevel();
	
	this.body.DefMale(BodyTypeMale.Thin);
	this.body.muscleTone.base = 0.4;
	this.body.femininity.base = -0.5;
	this.FirstCock().thickness.base = 5;
	this.FirstCock().length.base    = 19;
	this.Balls().size.base = 2;
	this.Balls().cumProduction.base = 2;
	this.body.SetRace(Race.Dragon);
	this.body.SetBodyColor(Color.green);
	this.body.SetEyeColor(Color.green);
	
	TF.SetAppendage(this.Back(), AppendageType.tail, Race.Dragon, Color.green);
	TF.SetAppendage(this.Appendages(), AppendageType.horn, Race.Dragon, Color.white, 4)
	
	this.Butt().virgin = true;
	
	this.SetLevelBonus();
	this.RecallAbilities();
	this.RestFull();

	this.flags["Met"] = 0;
	this.flags["SceneTalkHim"] = 0;
	this.flags["Introduced"] = 0;

	if(storage) this.FromStorage(storage);
}

Kindle.prototype = new Entity();
Kindle.prototype.constructor = Kindle;

// Flags
Kindle.Met = {
	NotMet	: 0,
	Met  	: 1
};

Kindle.SceneTalkHim = {
	NotTalked : 0,
	Talked	  : 1
};

Kindle.Introduced = {
	No 	: 0,
	Yes : 1
};

// Name or anonymous
Kindle.NameAnon = function(){
	return kindle.flags["Introduced"] == 0 ? "Draconian" : "Kindle";
}

// Schedule
Kindle.prototype.IsAtLocation = function(location) {
	return true;
}

// Load
Kindle.prototype.FromStorage = function(storage) {
	storage = storage || {};
	
	storage.body = this.body.ToStorage();
	
	// Flags
	this.LoadFlags(storage);
	this.LoadSexFlags(storage);
	this.LoadCombatStats(storage);
	this.LoadPersonalityStats(storage);
	
	this.LoadJobs(storage);
	this.LoadEquipment(storage);
	this.LoadPerks(storage);
	
}

//Save
Kindle.prototype.ToStorage = function() {
	var storage = {};
	
	if(storage.body) {
		this.body = new Body(this);
		this.body.FromStorage(storage.body);
	}
	
	// Save flags
	this.SaveFlags(storage);
	this.SaveSexFlags(storage);
	this.SaveCombatStats(storage);
	this.SavePersonalityStats(storage);
	
	this.SaveJobs(storage);
	this.SaveEquipment(storage);
	this.SavePerks(storage);
	
	return storage;
}

Scenes.Kindle = {};

Scenes.Kindle.Interact = function() {
	
	parse = {
		kindleAnon	: kindle.flags["Introduced"] == 0 ? "The draconian" : "Kindle",
		playerName 	: player.name,
		elfName		: kiakai.name,
		elfHeshe	: kiakai.HeShe(),
		elfheshe	: kiakai.heshe(),
		elfRace		: kiakai.Race().name,
		terryName	: terry.name,
		terryhisher	: terry.hisher()
	}
	
	Text.Clear();
	if(kindle.flags["Met"] == 0){
		Text.Add("You decide to approach the stranger. When you have closed the distance to about 50 meters you realise the figure has been watching you all along, never letting you out of sight. Whoever this is seems to have a keen eye.", parse);
		Text.NL();
		if(party.InParty(kiakai)) {
			Text.Add("You can tell [elfName] has noticed the same thing. [elfHeshe] looks at you. <i>“I have an uneasy feeling about this [playerName]..”</i>", parse);
			Text.NL();
		}
		if(party.InParty(terry)) {
			if(party.InParty(kiakai)) {
				Text.Add("<i>“I have to agree with the [elfRace] on this one.”</i> You hear [terryName] mumble, inching a bit closer to you.", parse);
				Text.NL();
			} else {
				Text.Add("You can feel [terryName] inching closer to you, supposedly feeling safer in your presence. You don't know if it was intentional or not but you can't help but smirk a little at [terryhisher] reaction.", parse);
				Text.NL();
			}
		}
		Text.Add("At this distance you begin to discern some detials of the stranger. He or she is clearly not human in appearance. You spot white horns protruding from the head, and you think you can make out areas of protective scales here and there. You'd almost make a first guess at a stray dessert lizard but there is something off about that. The visage sourrounding the stranger would trail closer to what many would compare draconic, a fact that does not serve to lighten the mood.")
		Text.NL();
		Text.Add("Like a hawk, the draconian is following your movements as you get closer. A thought crosses your mind and you try to look for visible weaponry. However, neither the stanger nor the close vicinity reveals any of the kind. As much as you'd like the thought of the stranger being defenseless you deem it highly unlikely that being the case. ", parse);
		Text.NL();
		Text.Add("The draconian have established a rather provisional campsite next to the big oak you spotted from earlier. It doesn't strike you as lived-in which make you conclude that the stranger hasn't been here for long. A small burnt-out fireplace and a bedroll lies a short distance from the draconians current location. Other than that there isn't much around that stands out.", parse);
		Text.NL();
		if(party.InParty(kiakai)) {
			Text.Add("<i>“[playerName], look!”</i> [elfName] whispers, and you look in the direction [elfheshe] points. ", parse);
		} else {
			Text.Add("That is until you notice a trail of blood. ", parse);
		}
		Text.Add("The carcass of a large leopard has suddenly come into view, previously hidden by an outcrop in the uneven landscape. Deep and viscious clawmarks is painstrikingly visible across its flanks, leaving no questions about the cause of death.", parse);
		Text.NL();
		if(party.InParty(terry)) {
			Text.Add("<i>“Holy.. that thing got mauled!”</i> [terryName] manages, giving you a horrified look.", parse);
			Text.NL();
		}
		Text.Add();
	}
	
	Text.Add("[kindleAnon] stands besides his makeshift campsite next to a small fireplace, his gaze set intentely upon you.", parse);
	Text.NL();
	Text.Add("<i>“What do you want?“</i> His voice is dark and brooding.", parse);
	Text.Flush();
	
	var options = [];
	options.push({ nameStr : "Talk", 
		func : function(){
			Text.Clear();
			Text.Add("<i>“So you wanna talk? Make it quick.“</i>", parse);
			Text.NL();
			Scenes.Kindle.Talk();
		}, enabled : true,
		tooltip : "Engage in a conversation"
	})
	options.push({ nameStr : "Appearance", 
		func : function(){
			Text.Clear();
			kindle.PrintDescription();
		}, enabled : true,
		tooltip : "Dare a peak at the draconian"
	})
	
	kindle.flags["Met"] = 1;
	Gui.SetButtonsFromList(options, true,);
}

Scenes.Kindle.Talk = function() {
	parse = {
		// Lata
	}
	Text.Add("What do you wanna talk about?", parse);
	Text.NL();
	Text.Flush();
	
	//<i>““</i>
	
	var options = [];
	options.push({ nameStr: "Him",
		func : Scenes.Kindle.TalkHim, enabled : true,
		tooltip : "Ask about him"
	});
	Gui.SetButtonsFromList(options, true, Scenes.Kindle.Interact);
}

Scenes.Kindle.TalkHim = function() {
	parse = {
		// Lata
	}
	
	Text.Clear();
	if(kindle.flags["SceneTalkHim"] == 1) {
		Text.Add("<i>“As I have mentioned before I don't remember who I am or where I come from. So don't expect I can answer any of your questions.“</i>", parse);		
	} else {
		kindle.flags["SceneTalkHim"] = 1;		
		Text.Add("<i>“You wanna hear about me? Im afraid i can't help you much on that subject.“</i>", parse);
		Text.NL();
		Text.Add("You can see he looks a bit uncomfortable, shifting his weight on the other leg. His gaze strikes out over the landscape for a moment before looking back at you. <i>“You see, i... have no memory of coming here.“</i>", parse);
	}
	Text.NL();
	Text.Add("He gives you a look of doubt, clearly doesn't see the point in asking any questions.")
	Text.Flush();
	
	//<i>““</i>
	
	var options = [];
	if(kindle.flags["Introduced"] == 0) {
		options.push({ nameStr: "Name",
		func : function() {
			kindle.flags["Introduced"] = 1;
			Text.Clear();
			Text.Add("Well for starters, maybe he can tell you what his name is?", parse);
			Text.NL();
			Text.Add("<i>“My name? It goes without saying that I don't remember that either.“</i> He says with a troubled frown on his face. How frustrating musn't it be to not even be able to remember your own name? You can't really tell for sure, but this draconian male seems rather cool and collected about the whole situation. Maybe he has had some time to come to terms with the ordeal?", parse);
			Text.NL();
			Text.Add("<i>“However..“</i> he says abruptly. <i>“You can call me Kindle.“</i>");
			Text.Flush();
			Gui.NextPrompt(Scenes.Kindle.TalkHim);
		}, enabled : true,
		tooltip : "Ask if he remembers his name"
		});
	} else {
		options.push({ nameStr: "Kindle?",
		func : function() {
			Text.Clear();
			Text.Add("Name from?", parse);
			Text.Flush();
		}, enabled : true,
		tooltip : "Ask where he got that name from"
		});
	}
	options.push({ nameStr: "Age",
		func : function() {
			Text.Clear();
			Text.Add("You ask what his age is", parse);
			Text.Flush();
		}, enabled : true,
		tooltip : "Ask what his age is"
	});
	options.push({ nameStr: "Gender",
		func : function() {
			Text.Clear();
			Text.Add("You ask what his gender is", parse);
			Text.Flush();
		}, enabled : true,
		tooltip : "Ask what his gender is"
	});
	Gui.SetButtonsFromList(options, true, function(){
		Text.Clear();
		Scenes.Kindle.Talk();
		});
}

world.loc.Highlands.Hills.events.push(new Link(
	// Button string
	function(){return kindle.flags["Met"] == 0 ? "Figure" : Kindle.NameAnon()},
	// Button visibility (can be set to a funtion, i.e. time of day)
	true,
	// Button enabled (true) / disabled (false)
	true,
	// Text to be shown when event (button) is available
	function() {
		Text.Add("Upon a hill in the distance you can make out a humanoid shape next to a big oak tree.");
		Text.NL();
	},
	// Which scene to trigger after selecting event
	Scenes.Kindle.Interact,
	// Tooltip
	"Approach the stranger?"
));
