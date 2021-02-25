module.exports = {
    adjectives : ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", 
    "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", 
    "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", 
    "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", 
    "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", 
    "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", 
    "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious",
    "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", 
    "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", 
    "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", 
    "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", 
    "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", 
    "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"],
    
    nouns : ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", 
    "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", 
    "curtains", "beets", "toilet", "exorcism", "figure", "mermaid", "barnacles", 
    "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice", "ukulele", 
    "kazoo", "banjo", "singer", "circus", "trampoline", "carousel", "carnival", "locomotive", 
    "hot", "mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", 
    "director", "designer", "flatter", "stylist", "leadman", "limner", "artist", "model", 
    "musician", "penciller", "producer", "scenographer", "decorator", "silversmith", "teacher", 
    "mechanic", "beader", "bobbin", "clerk", "attendant", "foreman", 
    "engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", 
    "operator", "plumber", "sawfiler", "foreman", "soaper", "engineer", "wheelwright", 
    "woodworkers"],

    getRandomInt : function(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    capFirst : function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getRandomName : function(){
        var uname = this.capFirst(this.adjectives[this.getRandomInt(0, this.adjectives.length + 1)])
                    + this.capFirst(this.nouns[this.getRandomInt(0, this.nouns.length + 1)]);

        return uname;
    }
}