
function BodyPart(race, color) {
	this.race  = race || Race.Human;
	this.color = color || Color.white;
}

BodyPart.HasFur = function(race) {
	return race.isRace(
		Race.Canine,
		Race.Feline,
		Race.Rabbit,
		Race.Goat,
		Race.Sheep,
		Race.Musteline,
		Race.Rabbit,
		Race.Wolf,
		Race.Tiger,
		Race.Panther,
		Race.Jaguar,
		Race.Puma,
		Race.Lynx,
		Race.Lion,
		Race.Dog,
		Race.Fox,
		Race.Jackal,
		Race.Hyena)
		||
		race.isRaceNotParent(Race.Deer);
}
BodyPart.HasScales = function(race) {
	return race.isRace(
		Race.Reptile,
		Race.Dragon,
		Race.Snake,
		Race.Lizard,
		Race.Salamander);
}
BodyPart.HasSkin = function(race) {
	return race.isRace(
		Race.Human,
		Race.Elf,
		Race.Demon,
		Race.Dryad);
}
BodyPart.HasHide = function(race) {
	return race.isRace(
		Race.Horse,
		Race.Zebra,
		Race.Cow,
		Race.Deer,
		Race.Goat,
		Race.Satyr,
		Race.Sheep);
}
BodyPart.HasFeathers = function(race) {
	return race.isRace(
		Race.Avian,
		Race.Gryphon);
}
BodyPartType = {
	cock   : 0,
	vagina : 1,
	ass    : 2,
	nipple : 3,
	mouth  : 4
}
